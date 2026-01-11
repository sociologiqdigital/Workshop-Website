const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    label: { type: String, default: "Workshop" },
    status: { 
        type: String, 
        enum: ['active', 'soon', 'closed'], 
        default: 'active' 
    },
    points: [String],
    // Supports multiple dates (e.g., Two consecutive Sundays)
    availableDates: [{ type: Date, required: true }], 
    imageUrl: { type: String }, 
    videoUrl: { type: String } // For Reel ratio videos
}, { timestamps: true });

module.exports = mongoose.model('Workshop', WorkshopSchema);