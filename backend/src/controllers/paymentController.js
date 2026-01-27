const crypto = require("crypto");
const Registration = require("../models/Registration");
const sendEmail = require("../utils/sendEmail");
const mongoose = require("mongoose");

function sha512(input) {
  return crypto.createHash("sha512").update(input).digest("hex");
}

/**
 * Coerce registrationType to match schema enum exactly (case-insensitive).
 * Schema enum is: ['Student','Employee','Other']
 */
function coerceRegistrationType(value) {
  if (!value) return null;
  const v = String(value).trim().toLowerCase();
  if (v === "student") return "Student";
  if (v === "employee") return "Employee";
  if (v === "other") return "Other";
  if (value === "Student" || value === "Employee" || value === "Other") return value;
  return null;
}

// 1) INITIATE PAYMENT
exports.initiatePayment = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      selectedDate,
      amount,
      workshopId,
      registrationType,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !selectedDate ||
      amount == null ||
      !workshopId ||
      !registrationType
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // ✅ Fix enum mismatch safely
    const fixedRegistrationType = coerceRegistrationType(registrationType);
    if (!fixedRegistrationType) {
      return res.status(400).json({
        success: false,
        message: `Invalid registrationType: ${registrationType}`,
        allowedValues: ["Student", "Employee", "Other"],
      });
    }

    const key = process.env.PAYU_MERCHANT_KEY;
    const salt = process.env.PAYU_MERCHANT_SALT;

    if (!key || !salt) {
      return res.status(500).json({
        success: false,
        message:
          "PAYU credentials missing in env (PAYU_MERCHANT_KEY / PAYU_MERCHANT_SALT)",
      });
    }

    // ✅ NEW: PayU URL based on environment
    const env = (process.env.PAYU_ENV || "test").toLowerCase();
    const payuUrl =
      env === "live"
        ? "https://secure.payu.in/_payment"
        : "https://test.payu.in/_payment";

    const txnid = "TXN" + Date.now();

    const newRegistration = new Registration({
      workshopId,
      name,
      email,
      phone,
      address,
      registrationType: fixedRegistrationType,
      selectedDate,
      amount,
      transactionId: txnid,
      paymentStatus: "Pending",
    });

    await newRegistration.save();

    const productinfo = "Workshop_Registration";
    const firstname = String(name).trim().split(" ")[0] || "User";

    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = sha512(hashString);

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

    return res.status(200).json({
      success: true,

      // ✅ NEW: return payuUrl to frontend (so no hardcoding)
      payuUrl,
      payuEnv: env,

      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      hash,
      surl: `${backendUrl}/api/payment/callback`,
      furl: `${backendUrl}/api/payment/callback`,
    });
  } catch (error) {
    console.error("Payment initiate error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Payment initiation failed",
    });
  }
};

// 2) PAYU CALLBACK
exports.payuCallback = async (req, res) => {
  try {
    const {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      hash,
      key,
      additionalCharges,
    } = req.body;

    const salt = process.env.PAYU_MERCHANT_SALT;
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5174";

    if (!salt) {
      return res.redirect(`${frontendUrl}/payment-failure?reason=missing_salt`);
    }

    const baseReverse = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const reverseHashString = additionalCharges
      ? `${additionalCharges}|${baseReverse}`
      : baseReverse;

    const calculatedHash = sha512(reverseHashString);

    if (calculatedHash !== hash) {
      return res.redirect(
        `${frontendUrl}/payment-failure?reason=hash_mismatch&bookingId=${txnid}`
      );
    }

    if (status === "success") {
      const registration = await Registration.findOneAndUpdate(
        { transactionId: txnid },
        { paymentStatus: "Success", payuResponse: req.body },
        { new: true }
      ).populate("workshopId");

      if (registration) {
        const emailHtml = `
          <h2>Registration Confirmed!</h2>
          <p>Hi ${registration.name}, your seat is reserved for <b>${registration.workshopId?.title || "Workshop"}</b>.</p>
          <p><b>Type:</b> ${registration.registrationType}</p>
          <p><b>Date:</b> ${new Date(registration.selectedDate).toLocaleString()}</p>
          <p><b>Transaction:</b> ${registration.transactionId}</p>
        `;

        await sendEmail({
          email: registration.email,
          subject: `✨ Confirmed: ${registration.workshopId?.title || "Workshop"}`,
          message: emailHtml,
        });
      }

      return res.redirect(`${frontendUrl}/payment-success?bookingId=${txnid}`);
    } else {
      await Registration.findOneAndUpdate(
        { transactionId: txnid },
        { paymentStatus: "Failed", payuResponse: req.body }
      );
      return res.redirect(`${frontendUrl}/payment-failure?bookingId=${txnid}`);
    }
  } catch (error) {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5174";
    return res.redirect(`${frontendUrl}/payment-failure?reason=callback_error`);
  }
};
