import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navStyle = (path) =>
    `px-3 py-2 rounded-lg text-sm font-semibold ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50 px-6 py-3 flex justify-between items-center">
      <a
        href="https://www.linkedin.com/in/vishaljat5112"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-bold text-blue-700 hover:underline"
      >
         📝🤖 ResuMIND 
      </a>
      <div className="flex gap-4">
        <Link to="/" className={navStyle("/")}>
          Home
        </Link>
        <Link to="/upload" className={navStyle("/upload")}>
          Upload
        </Link>
        <Link to="/result" className={navStyle("/result")}>
          Results
        </Link>
        <Link to="/jobs" className={navStyle("/jobs")}>
          Jobs
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;