// app.js (UPDATED - no data loss)

const express = require("express");
const cors = require("cors");
const path = require("path");

// ✅ Routes
const paymentRoutes = require("./routes/paymentRoutes");
const oneOnOnePaymentRoutes = require("./routes/oneOnOnePaymentRoutes"); // ✅ NEW
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const workshopRoutes = require("./routes/workshopRoutes");

// ✅ Error handler
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

/**
 * ✅ CORS
 * Put this in your .env:
 * FRONTEND_URL=http://localhost:5173
 */
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // allow Postman / server-to-server
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploads publicly
// uploads folder is: backend/uploads (outside src)
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
app.use("/uploads", express.static(UPLOAD_DIR));

// ✅ Routes wiring
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/oneonone", oneOnOnePaymentRoutes); // ✅ NEW
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);

// ✅ PUBLIC workshops (Home + Details will use this)
app.use("/api/workshops", workshopRoutes);

// ✅ Health checks
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API is running" });
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "active",
    message: "Digi Biz API is running",
  });
});

// ✅ Error middleware last
app.use(errorHandler);

module.exports = app;
