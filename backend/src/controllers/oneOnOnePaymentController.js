// backend/controllers/oneOnOnePaymentController.js (UPDATED REDIRECT PATHS ONLY)

const crypto = require("crypto");
const OneOnOneBooking = require("../models/OneOnOneBooking");

function sha512(input) {
  return crypto.createHash("sha512").update(input).digest("hex");
}

exports.initiateOneOnOnePayment = async (req, res) => {
  try {
    const { name, city, phone, email, topic, customTopic, date, amount } = req.body;

    if (!name || !city || !phone || !email || !topic || !date || amount == null) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const key = process.env.PAYU_MERCHANT_KEY;
    const salt = process.env.PAYU_MERCHANT_SALT;

    if (!key || !salt) {
      return res.status(500).json({
        success: false,
        message: "Missing PAYU_MERCHANT_KEY or PAYU_MERCHANT_SALT in .env",
      });
    }

    const env = (process.env.PAYU_ENV || "test").toLowerCase();
    const payuUrl = env === "live"
      ? "https://secure.payu.in/_payment"
      : "https://test.payu.in/_payment";

    const txnid = `ONEONONE_${Date.now()}`;
    const firstname = String(name).trim().split(" ")[0] || "User";
    const productinfo = "OneOnOne_Call";

    const booking = await OneOnOneBooking.create({
      name,
      city,
      phone,
      email,
      topic,
      customTopic: topic === "Other" ? (customTopic || "") : "",
      scheduledDate: new Date(`${date}T00:00:00`),
      amount,
      transactionId: txnid,
      paymentStatus: "Pending",
    });

    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = sha512(hashString);

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

    return res.status(200).json({
      success: true,
      payuUrl,
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      surl: `${backendUrl}/api/oneonone/callback`,
      furl: `${backendUrl}/api/oneonone/callback`,
      hash,
      bookingId: booking._id,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message || "init failed" });
  }
};

exports.payuOneOnOneCallback = async (req, res) => {
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
    const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";

    if (!salt) return res.redirect(`${frontendUrl}/oneonone-payment-failure?reason=missing_salt`);

    const baseReverse = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const reverseHashString = additionalCharges ? `${additionalCharges}|${baseReverse}` : baseReverse;
    const calculatedHash = sha512(reverseHashString);

    if (calculatedHash !== hash) {
      await OneOnOneBooking.findOneAndUpdate(
        { transactionId: txnid },
        { paymentStatus: "Failed", payuResponse: req.body }
      );
      return res.redirect(
        `${frontendUrl}/oneonone-payment-failure?reason=hash_mismatch&bookingId=${txnid}`
      );
    }

    if (String(status).toLowerCase() === "success") {
      await OneOnOneBooking.findOneAndUpdate(
        { transactionId: txnid },
        { paymentStatus: "Success", payuResponse: req.body }
      );
      return res.redirect(`${frontendUrl}/oneonone-payment-success?bookingId=${txnid}`);
    }

    await OneOnOneBooking.findOneAndUpdate(
      { transactionId: txnid },
      { paymentStatus: "Failed", payuResponse: req.body }
    );
    return res.redirect(`${frontendUrl}/oneonone-payment-failure?bookingId=${txnid}`);
  } catch (e) {
    const frontendUrl = process.env.CLIENT_URL || "http://localhost:5173";
    return res.redirect(`${frontendUrl}/oneonone-payment-failure?reason=callback_error`);
  }
};
