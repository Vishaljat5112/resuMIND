require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ✅ Routes
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://resu-mind-kll4vob6a-vishal-jats-projects-9cf473bc.vercel.app" // deployed frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check routes
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.get("/check", (req, res) => {
  res.send("Server is up and running!");
});

// ✅ Connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ Mongo Error:", err));
} else {
  console.warn("⚠ No MONGO_URI found in .env, skipping MongoDB connection");
}

// ✅ API Routes
app.use("/api/resume", resumeRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});