// models/Resume.js
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  score: Number,
  feedback: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", resumeSchema);