const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const adminController = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");

// ✅ Always save uploads in the SAME folder that app.js serves: backend/uploads
// __dirname = backend/src/routes  -> ../.. = backend
const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");

// ensure folder exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ✅ Store in /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // ✅ sanitize name (fix spaces/special chars causing bad URLs)
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

// ✅ Allow images + videos
const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const ok = [".jpeg", ".jpg", ".png", ".mp4", ".mov", ".avi", ".webm"].includes(ext);
    if (ok) return cb(null, true);
    cb(new Error("Only images and videos are allowed"));
  },
});

router.post("/login", adminController.loginAdmin);

// ✅ workshops
router.get("/workshops", protect, adminController.getAllWorkshops);

router.post(
  "/workshops",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  adminController.addWorkshop
);

router.put(
  "/workshops/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  adminController.updateWorkshop
);

router.delete("/workshops/:id", protect, adminController.deleteWorkshop);

router.get("/stats", protect, adminController.getDashboardStats);
router.get("/registrations", protect, adminController.getRegistrations);
router.get("/inquiries", protect, adminController.getAllInquiries);

module.exports = router;
