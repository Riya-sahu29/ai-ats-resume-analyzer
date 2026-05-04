import { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import Results from "../components/Results";
import Chatbot from "../components/Chatbot";

export default function Analyzer() {
  const [result, setResult] = useState(null);

  const userId = result?.session_id || null;
  const resumeSummary = result?.verdict
    ? `ATS Score: ${result.ats_score}/100. Verdict: ${result.verdict}.`
    : "";

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">

      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6 md:mb-8">
        AI ATS Resume Analyzer
      </h1>

      {/* Main card */}
      <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow">
        <ResumeForm setResult={setResult} />

        {result ? (
          <Results result={result} />
        ) : (
          <p className="text-center text-gray-400 text-sm py-4">
            Upload your resume to see results
          </p>
        )}
      </div>

      {/* Chatbot — shows after analysis */}
      {/* {userId && (
        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-xl shadow">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            💬 Ask the AI About Your Resume
          </h2>
          <Chatbot userId={userId} resumeSummary={resumeSummary} />
        </div>
      )} */}

    </div>
  );
}