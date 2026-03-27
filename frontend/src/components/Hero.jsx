

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">

      <div className="text-center max-w-3xl px-6">

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          AI Powered Resume Analyzer
        </h1>

        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Upload your resume and get ATS score and AI feedback instantly.
        </p>

        <div className="mt-6 flex justify-center gap-4">

          <Link
            to="/analyze"
            className="bg-orange-400 text-white text-sm md:text-base px-6 py-3 rounded-lg"
          >
            Analyze Resume
          </Link>

          <Link
            to="/chat"
            className="bg-blue-500 text-white text-sm md:text-base px-6 py-3 rounded-lg"
          >
            AI Chat
          </Link>

        </div>

      </div>

    </div>
  );
}
