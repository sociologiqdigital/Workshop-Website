// backend/models/OneOnOneBooking.js  (OPTIONAL BUT RECOMMENDED: save booking + status)

const mongoose = require("mongoose");

const OneOnOneBookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    topic: { type: String, required: true },
    customTopic: { type: String, default: "" },
    scheduledDate: { type: Date, required: true },

    amount: { type: Number, required: true },
    transactionId: { type: String, required: true, unique: true },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

    payuResponse: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OneOnOneBooking", OneOnOneBookingSchema);
