const express = require("express");
const router = express.Router();
const { uploadResume } = require("../controllers/resumeController");


router.post("/analyze", uploadResume);


router.get("/test", (req, res) => {
  res.send("Resume AI API Working fine with OpenRouter");
});

module.exports = router;
