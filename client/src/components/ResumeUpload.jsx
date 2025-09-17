import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import Loader from "../components/Loader"; //  Spinner component

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); //  loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true); //  start spinner
      // const response = await axios.post("https://resu-mind-backend.onrender.com/api/resume/analyze", formData);
      const response = await axios.post(
  "https://resu-mind-backend.onrender.com/api/resume/analyze",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);
      console.log("Upload success:", response.data);
      navigate("/result", { state: { data: response.data } });
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed, please try again.");
    } finally {
      setLoading(false); //  stop spinner
    }
  };

  // Show loading spinner during upload
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <div className="flex items-center justify-center mb-6 text-blue-600">
          <UploadCloud className="w-8 h-8 mr-2" />
          <h2 className="text-2xl font-bold">Upload Your Resume</h2>
        </div>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-100 file:text-blue-700
                     hover:file:bg-blue-200 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200"
        >
          Upload & Analyze
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;