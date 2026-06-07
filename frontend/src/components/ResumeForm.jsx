import { useState, useRef } from "react";
import { analyzeResume } from "../api/client";

const S = { IDLE: "idle", LOADING: "loading", ERROR: "error" };

export default function ResumeForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [status, setStatus] = useState(S.IDLE);
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const inputRef = useRef();

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!selected.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError("File too large. Maximum size is 5MB.");
      return;
    }
    setFile(selected);
    setError("");
  }

  async function handleSubmit() {
    if (!file) return setError("Please select a PDF resume.");
    if (!jd.trim()) return setError("Please enter a job description.");

    setStatus(S.LOADING);
    setError("");
    setResult(null);
    setStatusMsg("📤 Uploading resume...");

    try {
      setStatusMsg("🤖 AI is analyzing your resume. This may take 20-40 seconds on mobile...");
      const data = await analyzeResume(file, jd, (attempt) => {
        setStatusMsg(`🔄 Retrying analysis (attempt ${attempt} of 2)...`);
      });
      setStatus(S.IDLE);
      setStatusMsg("");
      setResult(data);
    } catch (err) {
      setStatus(S.ERROR);
      setStatusMsg("");
      setError(err.message);
    }
  }

  const isLoading = status === S.LOADING;
  const canSubmit = file && jd.trim() && !isLoading;

  return (
    <div className="space-y-3 sm:space-y-4">

      {/* File Upload */}
      <div
        onClick={() => !isLoading && inputRef.current.click()}
        className={`
          border-2 border-dashed rounded-xl
          p-4 sm:p-6 md:p-8
          text-center cursor-pointer transition-colors
          ${file ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 bg-gray-50"}
          ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        {file ? (
          <div>
            <p className="text-blue-600 font-medium text-sm sm:text-base">✅ {file.name}</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              {(file.size / 1024).toFixed(0)} KB · Tap to change
            </p>
          </div>
        ) : (
          <div>
            <div className="text-3xl sm:text-4xl mb-2">📄</div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Tap to upload your resume
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">PDF only · Max 5MB</p>
          </div>
        )}
      </div>

      {/* Job Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Description
        </label>
        <textarea
          className="
            w-full p-3 border border-gray-300 rounded-xl
            focus:outline-none focus:border-blue-400
            resize-none text-sm text-gray-800 bg-white
            min-h-[100px] sm:min-h-[120px] md:min-h-[140px]
          "
          placeholder="Paste the full job description here..."
          rows={4}
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-300 rounded-xl text-sm text-red-700">
          <span className="text-base">⚠️</span>
          <div className="flex-1 text-xs sm:text-sm">
            {error}
            {status === S.ERROR && (
              <button
                onClick={handleSubmit}
                className="block mt-2 text-blue-600 underline font-medium text-xs sm:text-sm"
              >
                🔄 Try again
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-700 animate-pulse">
          {statusMsg}
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`
          w-full py-3 sm:py-4 rounded-xl font-semibold transition-all
          text-sm sm:text-base
          ${canSubmit
            ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"}
        `}
      >
        {isLoading ? "⏳ Analyzing..." : "🚀 Analyze Resume"}
      </button>

    </div>
  );
}
