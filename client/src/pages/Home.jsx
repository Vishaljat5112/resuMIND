import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("📁 Please select a resume file first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
const response = await axios.post("https://resu-mind-backend.onrender.com/api/resume/analyze", formData);
      console.log("Response data from server:", response.data);
      navigate('/result', { state: response.data });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">AI Resume Analyzer</h1>
        
        <div className="flex flex-col gap-4">
          <label className="text-gray-700 font-semibold">
            📁 Upload Resume (PDF/DOC)
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full px-4 py-2 rounded-lg font-bold text-white transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? "⏳ Analyzing..." : "🚀 Upload & Analyze"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;