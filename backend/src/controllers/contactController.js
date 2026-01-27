const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const escapeHtml = (str) =>
  String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// 1. Submit a Contact Form (Public)
exports.submitContactForm = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body || {};

    if (!fullName || !email || !message) {
      return res.status(400).json({
        message: "fullName, email and message are required.",
      });
    }

    // ✅ Save to DB (your existing behavior)
    const newContact = new Contact({ fullName, email, phone, message });
    await newContact.save();

    // ✅ Send email (NEW)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.SMTP_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `New Contact Form: ${fullName}`,
      text:
        `New Contact Form Submission\n\n` +
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || "-"}\n\n` +
        `Message:\n${message}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><b>Name:</b> ${escapeHtml(fullName)}</p>
          <p><b>Email:</b> ${escapeHtml(email)}</p>
          <p><b>Phone:</b> ${escapeHtml(phone || "-")}</p>
          <hr />
          <p style="white-space: pre-wrap;"><b>Message:</b><br/>${escapeHtml(message)}</p>
        </div>
      `,
    });

    return res.status(201).json({
      message: "Message sent successfully! We will contact you soon.",
    });
  } catch (error) {
    console.error("submitContactForm error:", error);
    return res.status(500).json({
      message: "Failed to send message",
      error: error.message,
    });
  }
};

// 2. Get all Messages (Protected - Admin Only)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching messages" });
  }
};
