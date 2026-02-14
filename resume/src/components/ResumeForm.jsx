import axios from "axios";
import { useState } from "react";

export default function ResumeForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert("Upload resume & enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDesc);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/analyze-resume/",
        formData
      );

      console.log("BACKEND RESPONSE:", res.data);

      setResult(res.data.analysis ?? res.data);

    } catch (err) {
      console.error("Error:", err);
      alert("Backend error — check terminal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-black/40 p-6 rounded border border-white/10">

      <input 
        type="file" 
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-2 border rounded bg-transparent"
      />

      <textarea
        placeholder="Paste Job Description..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={5}
        className="w-full p-2 border rounded bg-transparent"
      />

      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-2 bg-indigo-600 text-white rounded"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

    </div>
  );
}
