import ResumeForm from "../components/ResumeForm";
import Results from "../components/Results";
import { useState } from "react";
import Chatbot from "../components/Chatbot";

export default function Analyzer() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-10 px-4 sm:px-6 lg:px-10 py-6">

      <h1 className="text-xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        AI ATS Resume Analyzer
      </h1>

      <div className="w-full max-w-3xl mx-auto space-y-6 bg-white p-6 rounded-xl shadow">

        {/* Upload form */}
        <ResumeForm setResult={setResult} />

        {/* Show results */}
        {result ? (
          <Results result={result} />
        ) : (
          <p className="text-center text-gray-500">
            Upload resume to see results
          </p>
        )}

        {/* Add chatbot here */}
        <div className="mt-10">
          <Chatbot />
        </div>  

      </div>
    </div>
  );
}
