const express = require("express");
const router = express.Router();
const { initiatePayment, payuCallback } = require("../controllers/paymentController");

// Start the payment process
router.post("/initiate", initiatePayment);

// Handle PayU response (SURL/FURL)
router.post("/callback", payuCallback);

module.exports = router;
