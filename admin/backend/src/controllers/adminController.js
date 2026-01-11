const Admin = require('../models/Admin');
const Workshop = require('../models/Workshop');
const Registration = require('../models/Registration');
const Contact = require('../models/Contact');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.loginAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({
            message: "Login successful",
            token,
            user: { role: "ADMIN", username: admin.username },
            admin: { username: admin.username }
        });
    } catch (error) { next(error); }
};

exports.getAllWorkshops = async (req, res, next) => {
    try {
        const workshops = await Workshop.find().sort({ createdAt: -1 });
        res.json(workshops);
    } catch (error) { next(error); }
};

exports.addWorkshop = async (req, res, next) => {
    try {
        const { title, description, price, availableDates } = req.body;
        
        // Use req.files from Multer to get the public URL paths
        const imageUrl = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : '';
        const videoUrl = req.files['video'] ? `/uploads/${req.files['video'][0].filename}` : '';

        const newWorkshop = new Workshop({
            title,
            description,
            price,
            slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            imageUrl,
            videoUrl,
            availableDates: JSON.parse(availableDates) // Dates arrive as JSON string in FormData
        });

        await newWorkshop.save();
        res.status(201).json({ message: "Workshop added successfully", newWorkshop });
    } catch (error) { next(error); }
};

exports.getRegistrations = async (req, res, next) => {
    try {
        const { workshopId } = req.query;
        let query = { paymentStatus: 'Success' };
        if (workshopId && workshopId !== 'all') query.workshopId = workshopId;
        const data = await Registration.find(query)
            .populate('workshopId', 'title price availableDates imageUrl')
            .sort({ createdAt: -1 });
        res.json({ success: true, data });
    } catch (error) { next(error); }
};

exports.getDashboardStats = async (req, res, next) => {
    try {
        const { workshopId } = req.query;
        let matchQuery = { paymentStatus: 'Success' };
        if (workshopId && workshopId !== 'all') matchQuery.workshopId = new mongoose.Types.ObjectId(workshopId);
        const salesData = await Registration.aggregate([
            { $match: matchQuery },
            { $group: { _id: null, totalRevenue: { $sum: "$amount" }, totalRegistrations: { $count: {} } } }
        ]);
        const stats = salesData[0] || { totalRevenue: 0, totalRegistrations: 0 };
        const totalWorkshops = await Workshop.countDocuments();
        const totalInquiries = await Contact.countDocuments();
        res.json({ ...stats, totalWorkshops, totalInquiries });
    } catch (error) { next(error); }
};

exports.updateWorkshop = async (req, res, next) => {
    try {
        const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Workshop updated", workshop });
    } catch (error) { next(error); }
};

exports.deleteWorkshop = async (req, res, next) => {
    try {
        await Workshop.findByIdAndDelete(req.params.id);
        res.json({ message: "Workshop deleted" });
    } catch (error) { next(error); }
};

exports.getAllInquiries = async (req, res, next) => {
    try {
        const inquiries = await Contact.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) { next(error); }
};
