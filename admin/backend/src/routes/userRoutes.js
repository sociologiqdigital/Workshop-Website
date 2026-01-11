const express = require('express');
const router = express.Router();

// Both functions are located in userController.js
const { submitContact, paymentSuccess } = require('../controllers/userController');

// 1. Route for the "Contact Us" form
router.post('/contact', submitContact);

// 2. Route for the PayU success callback
// Note: name must match the export in userController.js
router.post('/payment-success', paymentSuccess);

module.exports = router;