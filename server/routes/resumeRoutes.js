const express = require("express");
const router = express.Router();
const { uploadResume } = require("../controllers/resumeController");

// 🔹 Analyze route
router.post("/analyze", uploadResume);

// 🔹 Test route
router.get("/test", (req, res) => {
  res.send("Resume AI API Working fine with OpenRouter");
});

module.exports = router;