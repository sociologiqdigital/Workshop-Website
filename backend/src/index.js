const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const workshopRoutes = require("./routes/workshopRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ ADDED

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SERVE UPLOADED FILES PUBLICLY
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/contact", contactRoutes); // ✅ ADDED

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "active", message: "Sociologiq API is running" });
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) =>
    console.error("❌ MongoDB Connection Error:", err.message)
  );
