const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Existing short description (keep for backward compatibility)
    description: { type: String, default: "" },

    // ✅ Home card short content (NEW)
    cardDescription: { type: String, default: "" },
    cardPoints: { type: [String], default: [] }, // show max 4 on home

    // ✅ Details page rich content (NEW)
    longDescription: { type: String, default: "" },
    detailPoints: { type: [String], default: [] }, // show full on details page

    price: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["active", "soon", "closed"],
      default: "active",
    },

    availableDates: { type: [Date], default: [] },

    // Media (optional: image not used on workshop page currently)
    imageUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workshop", workshopSchema);
