const express = require('express');
const router = express.Router();
const { submitContactForm, getAllMessages } = require('../controllers/contactController');
const protect = require('../middleware/auth'); // Admin protection

router.post('/submit', submitContactForm);
router.get('/all', protect, getAllMessages);

module.exports = router;