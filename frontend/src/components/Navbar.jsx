

import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logoai.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">

        {/* Left side logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="AI Resume Analyzer" className="h-10" />
          <span className="text-lg md:text-xl font-bold text-orange-500">
            AI Resume Analyzer
          </span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-gray-800 font-medium text-sm md:text-base">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/analyze" className="hover:text-orange-500">Analyze</Link>
          <Link to="/chat" className="hover:text-orange-500">AI Chat</Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md border border-gray-200 text-gray-700"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu links */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden border-t border-gray-200 bg-white`}> 
        <div className="flex flex-col gap-1 p-3 text-gray-800 text-sm">
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/analyze"
            className="block px-3 py-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Analyze
          </Link>
          <Link
            to="/chat"
            className="block px-3 py-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            AI Chat
          </Link>
        </div>
      </div>
    </nav>
  );
}