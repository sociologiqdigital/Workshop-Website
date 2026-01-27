require("dotenv").config();
const mongoose = require("mongoose");

// ✅ IMPORTANT: load the real app inside src
const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

async function start() {
  try {
    if (!MONGO_URI) {
      console.warn("⚠️ MONGO_URI is missing. Server will start without DB connection.");
    } else {
      await mongoose.connect(MONGO_URI);
      console.log("✅ MongoDB connected");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
}

start();
