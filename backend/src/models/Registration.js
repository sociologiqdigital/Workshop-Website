const mongoose = require("mongoose");

/**
 * Registration Schema
 * Status transitions from 'Pending' -> 'Success' or 'Failed' via PayU callback.
 */
const RegistrationSchema = new mongoose.Schema(
  {
    workshopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
      required: [true, "Workshop ID is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    registrationType: {
      type: String,
      enum: ["Student", "Employee", "Other", "student", "employee", "other"],
      required: [true, "Registration type is required"],
      default: "Student",
    },
    selectedDate: {
      type: Date,
      required: [true, "Workshop date is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
      index: true,
    },
    payuResponse: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for fast Admin Dashboard filtering
RegistrationSchema.index({ paymentStatus: 1, createdAt: -1 });

module.exports = mongoose.model("Registration", RegistrationSchema);
