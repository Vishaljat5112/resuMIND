import React from "react";
import { useLocation } from "react-router-dom";

const Jobs = () => {
  const location = useLocation();
  const jobSuggestions = location.state?.jobSuggestions || [];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">🔍 Job Recommendations</h1>
      <p className="text-gray-700 text-lg mb-6 text-center max-w-xl">
        Based on your resume, we’ve found some job roles that match your skills. Click below to explore live job listings on LinkedIn & Naukri:
      </p>

      {jobSuggestions.length > 0 ? (
        <div className="space-y-4 w-full max-w-lg">
          {jobSuggestions.map((job, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{job}</h3>
              <div className="flex gap-4">
                <a
                  href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View on LinkedIn
                </a>
                <a
                  href={`https://www.naukri.com/${job.toLowerCase().replace(/ /g, '-')}-jobs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline hover:text-green-800"
                >
                  View on Naukri
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No job suggestions available. Please upload a resume first.</p>
      )}
    </div>
  );
};

export default Jobs;