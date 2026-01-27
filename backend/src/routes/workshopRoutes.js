const express = require("express");
const router = express.Router();
const Workshop = require("../models/Workshop");

// ✅ PUBLIC: list workshops (for Home cards)
router.get("/", async (req, res, next) => {
  try {
    const workshops = await Workshop.find({ status: { $ne: "closed" } })
      .sort({ createdAt: -1 })
      .select(
        "title slug status price availableDates videoUrl " +
          "description cardDescription cardPoints " +
          "createdAt"
      );

    res.json(workshops);
  } catch (err) {
    next(err);
  }
});

// ✅ PUBLIC: get workshop details by slug (for Details page)
router.get("/:slug", async (req, res, next) => {
  try {
    const workshop = await Workshop.findOne({ slug: req.params.slug }).select(
      "title slug status price availableDates videoUrl imageUrl " +
        "description cardDescription cardPoints " +
        "longDescription detailPoints createdAt"
    );

    if (!workshop || workshop.status === "closed") {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.json(workshop);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
