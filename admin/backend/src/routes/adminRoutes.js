const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|mp4|mov|avi/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) return cb(null, true);
        cb(new Error("Only images and videos are allowed"));
    }
});

router.post('/login', adminController.loginAdmin);
router.get('/workshops', adminController.getAllWorkshops);

// PROTECTED: Multipart upload for Image and Video
router.post('/workshops', protect, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), adminController.addWorkshop);

router.put('/workshops/:id', protect, adminController.updateWorkshop);
router.delete('/workshops/:id', protect, adminController.deleteWorkshop);

router.get('/stats', protect, adminController.getDashboardStats);
router.get('/registrations', protect, adminController.getRegistrations);
router.get('/inquiries', protect, adminController.getAllInquiries);

module.exports = router;