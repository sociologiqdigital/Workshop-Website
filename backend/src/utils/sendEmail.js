const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // 1. Create transporter using Hostinger SMTP settings
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE === 'true', // true for 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 2. Define email options
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: options.email,
            subject: options.subject,
            html: options.message, // We use HTML for the workshop ticket look
        };

        // 3. Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent: " + info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Email Sending Error:", error);
        throw new Error("Email could not be sent");
    }
};

module.exports = sendEmail;