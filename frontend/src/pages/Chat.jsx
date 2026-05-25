import { useState } from "react";
import Chatbot from "../components/Chatbot";

export default function Chat() {
  const [userId] = useState("guest-" + Math.random().toString(36).slice(2, 10));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-3 sm:px-6 py-6 sm:py-10">

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          💬 AI Career Advisor
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Get instant advice on your resume, skills, and career
        </p>
      </div>

      {/* Chat box — full width on mobile, centered on tablet/laptop */}
      <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Tip banner */}
          <div className="bg-blue-50 border-b border-blue-100 px-4 sm:px-6 py-3">
            <p className="text-xs sm:text-sm text-blue-700">
              💡 <span className="font-medium">Tip:</span> Analyze your resume first on the{" "}
              <a href="/analyze" className="underline font-semibold hover:text-blue-900">
                Analyzer page
              </a>{" "}
              — then I will have full context about your resume.
            </p>
          </div>

          {/* Chatbot — taller on tablet and laptop */}
          <div className="p-2 sm:p-4 ">
            <Chatbot userId={userId} resumeSummary="" />
          </div>

        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Powered by Groq AI · Responses may take a few seconds
        </p>
      </div>

    </div>
  );
}