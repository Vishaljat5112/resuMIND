import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-10 border-t">
      <p>Made with ❤ by Vishal Jat © 2025</p>
      <div className="flex justify-center gap-4 mt-2">
        <a
          href="https://www.linkedin.com/in/vishaljat5112"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
        <a
          href="https://github.com/Vishaljat5112"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:underline flex items-center gap-1"
        >
          <Github className="w-4 h-4" /> GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;