import ResumeForm from "../components/ResumeForm";
import Results from "../components/Results";
import { useState } from "react";
import Chatbot from "../components/Chatbot";

export default function Analyzer() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen p-10">

      <h1 className="text-3xl font-bold text-center mb-6">
        AI ATS Resume Analyzer
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">

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
