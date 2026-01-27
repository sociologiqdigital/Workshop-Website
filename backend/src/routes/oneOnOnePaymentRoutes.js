// backend/routes/oneOnOnePaymentRoutes.js  (FULL FILE)

const express = require("express");
const router = express.Router();
const {
  initiateOneOnOnePayment,
  payuOneOnOneCallback,
} = require("../controllers/oneOnOnePaymentController");

router.post("/initiate", initiateOneOnOnePayment);
router.post("/callback", payuOneOnOneCallback);

module.exports = router;
