const Contact = require('../models/Contact');

// 1. Submit a Contact Form (Public)
exports.submitContactForm = async (req, res) => {
    try {
        const { fullName, email, phone, message } = req.body;
        const newContact = new Contact({ fullName, email, phone, message });
        await newContact.save();
        res.status(201).json({ message: "Message sent successfully! We will contact you soon." });
    } catch (error) {
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
};

// 2. Get all Messages (Protected - Admin Only)
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
};