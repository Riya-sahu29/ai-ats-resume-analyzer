

import { Link } from "react-router-dom";

import logo from "../assets/logoai.svg";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">

      {/* Left side logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="AI Resume Analyzer" className="h-10" />
        <span className="text-xl font-bold text-orange-500">
          AI Resume Analyzer
        </span>
      </div>

      {/* Menu */}
      <div className="hidden md:flex gap-6 text-gray-800 font-medium">
        <a href="/" className="hover:text-orange-500">Home</a>
        <a href="/analyze" className="hover:text-orange-500">Analyze</a>
        <a href="/chat" className="hover:text-orange-500">AI Chat</a>
      </div>

    </nav>
  );
}
