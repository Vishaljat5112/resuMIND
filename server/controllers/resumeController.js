const multer = require("multer");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("resume");


const extractEmail = (text) => {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : "N/A";
};

const extractPhone = (text) => {
  const match = text.match(/(?:\+91[-\s]?)?[6-9]\d{9}/);
  return match ? match[0] : "N/A";
};

const extractName = (text) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 2 && isNaN(line));
  return lines.length > 0 ? lines[0].replace(/[^a-zA-Z ]/g, "") : "N/A";
};


const uploadResume = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      console.log("✅ Resume analyze API called");

      if (err) {
        console.error("❌ Multer error:", err);
        return res.status(500).json({ message: "File upload error", error: err });
      }

      if (!req.file) {
        console.log("❌ No file received in request");
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log("📂 File received:", req.file.originalname);

      const pdfBuffer = req.file.buffer;
      const parsed = await pdfParse(pdfBuffer);
      const resumeText = parsed.text;

      const name = extractName(resumeText);
      const email = extractEmail(resumeText);
      const phone = extractPhone(resumeText);

      console.log("📌 Extracted Data:", { name, email, phone });

      const prompt = `
You are a professional resume reviewer.

Analyze the following resume and return the insights in proper JSON format.

Please provide:
1. A brief summary of the candidate.
2. Skill analysis: What relevant skills are present, and what important ones are missing.
3. Feedback on projects (quality, relevance, and clarity).
4. Resume improvement suggestions: Include formatting, grammar, clarity, and ATS (Applicant Tracking System) compatibility.
5. Job roles suitable for the candidate based on the resume.

Resume Text:
${resumeText}

Return response in this strict JSON format:
{
  "skills": ["ReactJS", "NodeJS"],
  "feedback": "Short overall feedback about resume",
  "jobSuggestions": ["Frontend Developer", "Full Stack Developer", "Software Intern"],
  "improvements": ["Add more project details", "Fix formatting issues", "Make resume ATS-friendly"]
}
`.trim();

      // 🔹 OpenRouter API call
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      let aiResponse = response.data.choices[0].message.content;
      aiResponse = aiResponse.replace(/```(json)?/g, "").trim();

      const parsedAI = JSON.parse(aiResponse);

      res.json({
        name,
        email,
        phone,
        matchedSkills: parsedAI.skills || ["No skills found"],
        feedback: {
          score: parsedAI.skills?.length
            ? Math.min(parsedAI.skills.length * 10, 100)
            : 0,
          summary: parsedAI.feedback,
          improvements: parsedAI.improvements || [],
        },
        jobSuggestions: parsedAI.jobSuggestions || [],
        resumeText,
      });
    } catch (err) {
      console.error("❌ AI Resume Analysis Error:", err.message);
      res
        .status(500)
        .json({ message: "Resume analysis failed", error: err.message });
    }
  });
};

module.exports = { uploadResume };
