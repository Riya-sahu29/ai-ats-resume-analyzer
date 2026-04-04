import axios from "axios";
import { useState } from "react";
 
export default function ResumeForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDesc);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://ai-ats-resume-analyzer-backend.onrender.com/analyze-resume/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("BACKEND RESPONSE:", res.data);

      // if backend returns {analysis: ...}
      setResult(res.data.analysis ?? res.data);

    } catch (err) {
      console.error("Error:", err);

      if (err.response) {
        alert("Server Error: " + err.response.data);
      } else {
        alert("Network error. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow border border-blue-100 transition duration-300 hover:shadow-xl hover:-translate-y-0.5">

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-3 border border-blue-200 rounded text-gray-900 text-sm md:text-base"
      />

      <textarea
        placeholder="Paste Job Description..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={5}
        className="w-full p-3 border border-blue-200 rounded text-gray-900 text-sm md:text-base"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm md:text-base"
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>

    </div>
  );
}
