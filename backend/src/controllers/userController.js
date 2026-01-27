const Contact = require('../models/Contact');
const Registration = require('../models/Registration');
const sendEmail = require('../utils/sendEmail');

// Handle Contact Form
exports.submitContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: "Message received successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Handle Payment Success (Webhook)
exports.paymentSuccess = async (req, res) => {
    try {
        const { txnid, status, email, firstname } = req.body;

        if (status === 'success') {
            // 1. Update Registration in DB
            const registration = await Registration.findOneAndUpdate(
                { transactionId: txnid },
                { paymentStatus: 'Success' },
                { new: true }
            ).populate('workshopId');

            // 2. Check if registration exists before sending email
            if (registration) {
                try {
                    await sendEmail({
                        email: email || registration.email,
                        subject: 'Workshop Registration Confirmed!',
                        message: `Hi ${firstname || 'there'}! Your registration for ${registration.workshopId.title} is successful. See you there!`,
                    });
                } catch (emailErr) {
                    console.error("Email failed to send, but payment was recorded:", emailErr);
                    // We don't want to crash the whole process if just the email fails
                }

                // 3. Final Response to User (Browser)
                res.send(`
                    <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
                        <h1 style="color: green;">Payment Successful!</h1>
                        <p>A confirmation email has been sent to ${email}.</p>
                        <p>You can close this window now.</p>
                    </div>
                `);
            } else {
                res.status(404).send("Registration record not found.");
            }
        } else {
            res.status(400).send("Payment status was not successful.");
        }
    } catch (error) {
        console.error("Payment Success logic error:", error);
        res.status(500).send("Error processing payment success");
    }
};