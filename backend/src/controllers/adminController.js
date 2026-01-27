const Admin = require("../models/Admin");
const Workshop = require("../models/Workshop");
const Registration = require("../models/Registration");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Helpers
const toSlug = (title = "") =>
  title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const parseArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);

  if (typeof value === "string") {
    const trimmed = value.trim();

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((v) => String(v).trim()).filter(Boolean);
      }
    } catch (_) {}

    return trimmed
      .split(/\r?\n/)
      .map((v) => v.trim())
      .filter(Boolean);
  }

  return [];
};

const parseDatesField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);

  if (typeof value === "string") {
    const trimmed = value.trim();
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch (_) {}

    return trimmed
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  return [];
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { role: "ADMIN", username: admin.username },
      admin: { username: admin.username },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllWorkshops = async (req, res, next) => {
  try {
    const workshops = await Workshop.find().sort({ createdAt: -1 });
    res.json(workshops);
  } catch (error) {
    next(error);
  }
};

exports.addWorkshop = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      status,
      availableDates,
      cardDescription,
      cardPoints,
      longDescription,
      detailPoints,
    } = req.body;

    const imageUrl =
      req.files && req.files["image"] ? `/uploads/${req.files["image"][0].filename}` : "";

    const videoUrl =
      req.files && req.files["video"] ? `/uploads/${req.files["video"][0].filename}` : "";

    const newWorkshop = new Workshop({
      title,
      slug: toSlug(title),
      description: description || "",
      cardDescription: cardDescription || "",
      cardPoints: parseArrayField(cardPoints).slice(0, 4),
      longDescription: longDescription || "",
      detailPoints: parseArrayField(detailPoints),
      price: Number(price) || 0,
      status: (status || "active").toLowerCase(),
      availableDates: parseDatesField(availableDates),
      imageUrl,
      videoUrl,
    });

    await newWorkshop.save();
    res.status(201).json({ message: "Workshop added successfully", newWorkshop });
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ UPDATED: Admin registrations now support:
 * - workshopId filter: ?workshopId=<id|all>
 * - paymentStatus filter: ?status=Pending|Success|Failed|all
 * Default returns ALL statuses (professional admin behavior).
 */
exports.getRegistrations = async (req, res, next) => {
  try {
    const { workshopId, status } = req.query;

    const query = {};

    if (workshopId && workshopId !== "all") query.workshopId = workshopId;

    if (status && status !== "all") {
      // keep backend enum language: Pending|Success|Failed
      query.paymentStatus = status;
    }

    const data = await Registration.find(query)
      .populate("workshopId", "title price availableDates imageUrl")
      .sort({ createdAt: -1 });

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

/**
 * ✅ UPDATED: Dashboard stats now return:
 * - totalRevenue (Success only)
 * - totalRegistrations (ALL)
 * - counts by status: paidCount, pendingCount, failedCount
 * - totalWorkshops, totalInquiries
 * Supports optional workshopId filter.
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    const { workshopId } = req.query;

    const baseMatch = {};
    if (workshopId && workshopId !== "all") {
      baseMatch.workshopId = new mongoose.Types.ObjectId(workshopId);
    }

    const agg = await Registration.aggregate([
      { $match: baseMatch },
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
          revenue: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "Success"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    let totalRevenue = 0;
    let totalRegistrations = 0;
    let paidCount = 0;
    let pendingCount = 0;
    let failedCount = 0;

    for (const row of agg) {
      totalRegistrations += row.count || 0;
      totalRevenue += row.revenue || 0;

      if (row._id === "Success") paidCount = row.count || 0;
      if (row._id === "Pending") pendingCount = row.count || 0;
      if (row._id === "Failed") failedCount = row.count || 0;
    }

    const totalWorkshops = await Workshop.countDocuments();
    const totalInquiries = await Contact.countDocuments();

    res.json({
      totalRevenue,
      totalRegistrations,
      paidCount,
      pendingCount,
      failedCount,
      totalWorkshops,
      totalInquiries,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateWorkshop = async (req, res, next) => {
  try {
    const update = { ...req.body };

    if (update.status) update.status = String(update.status).toLowerCase();

    if (update.price !== undefined) {
      update.price = Number(update.price) || 0;
    }

    if (update.availableDates !== undefined) {
      update.availableDates = parseDatesField(update.availableDates);
    }

    if (update.cardPoints !== undefined) {
      update.cardPoints = parseArrayField(update.cardPoints).slice(0, 4);
    }
    if (update.detailPoints !== undefined) {
      update.detailPoints = parseArrayField(update.detailPoints);
    }

    if (req.files && req.files["image"]) {
      update.imageUrl = `/uploads/${req.files["image"][0].filename}`;
    }
    if (req.files && req.files["video"]) {
      update.videoUrl = `/uploads/${req.files["video"][0].filename}`;
    }

    if (update.title) update.slug = toSlug(update.title);

    const workshop = await Workshop.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json({ message: "Workshop updated", workshop });
  } catch (error) {
    next(error);
  }
};

exports.deleteWorkshop = async (req, res, next) => {
  try {
    await Workshop.findByIdAndDelete(req.params.id);
    res.json({ message: "Workshop deleted" });
  } catch (error) {
    next(error);
  }
};

exports.getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    next(error);
  }
};
