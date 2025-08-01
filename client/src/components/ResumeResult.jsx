import React from 'react';
import { Mail, Phone, BadgeCheck, FileText, ThumbsUp, Briefcase } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';

const ResumeResult = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return <p className="text-center text-gray-500 mt-10">No data available. Please upload a resume.</p>;

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleExploreJobs = () => {
    navigate("/jobs", { state: { jobSuggestions: data.jobSuggestions || [] } });
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">🎯 Resume Analysis Report</h2>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={fadeIn}>
        <div className="flex items-center gap-2 text-gray-700">
          <BadgeCheck className="w-5 h-5 text-green-500" /> <strong>Name:</strong> {data.name || "N/A"}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="w-5 h-5 text-blue-500" /> <strong>Email:</strong> {data.email || "N/A"}
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="w-5 h-5 text-red-500" /> <strong>Phone:</strong> {data.phone || "N/A"}
        </div>
      </motion.div>

      <motion.div className="w-32 mx-auto mb-6" variants={fadeIn}>
        <CircularProgressbar
          value={data.feedback?.score || 0}
          text={`${data.feedback?.score || 0}/100`}
          styles={buildStyles({
            textSize: '16px',
            pathColor: '#3B82F6',
            textColor: '#1F2937',
            trailColor: '#D1D5DB',
          })}
        />
        <p className="text-center mt-2 font-semibold text-blue-600">Skill Score</p>
      </motion.div>

      <motion.div variants={fadeIn}>
        <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          <BadgeCheck className="w-5 h-5" /> Skills:
        </h3>
        <ul className="list-disc list-inside mt-2 text-gray-800 pl-4">
          {data.matchedSkills?.length ? (
            data.matchedSkills.map((skill, i) => <li key={i}>{skill}</li>)
          ) : (
            <li>No skills found</li>
          )}
        </ul>
      </motion.div>

      <motion.div variants={fadeIn}>
        <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          <FileText className="w-5 h-5" /> Feedback:
        </h3>
        <p className="mt-1 text-gray-700">{data.feedback?.summary || "No feedback available."}</p>
      </motion.div>

      <motion.div variants={fadeIn}>
        <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          <ThumbsUp className="w-5 h-5" /> Suggestions to Improve:
        </h3>
        <ul className="list-disc list-inside mt-2 text-gray-800 pl-4">
          {data.feedback?.improvements?.length ? (
            data.feedback.improvements.map((imp, i) => <li key={i}>{imp}</li>)
          ) : (
            <li>No improvement suggestions found</li>
          )}
        </ul>
      </motion.div>

      <motion.div variants={fadeIn}>
        <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          <Briefcase className="w-5 h-5" /> Job Role Suggestions:
        </h3>
        <ul className="list-disc list-inside mt-2 text-gray-800 pl-4">
          {data.jobSuggestions?.length ? (
            data.jobSuggestions.map((job, i) => <li key={i}>{job}</li>)
          ) : (
            <li>No job suggestions found</li>
          )}
        </ul>
      </motion.div>

      <div className="flex justify-center pt-4">
        <button
          onClick={handleExploreJobs}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          🔍 Explore Relevant Jobs
        </button>
      </div>
    </motion.div>
  );
};

export default ResumeResult;