import React, { useState } from "react";
import axios from "axios";

const ResumeForm = () => {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userMessage, setUserMessage] = useState("");
  const [chatReply, setChatReply] = useState("");
  const [resumeText, setResumeText] = useState("");

  // ================= RESUME ANALYSIS =================
  const handleAnalyze = async () => {
    if (!file || !jobDesc) {
      alert("Please upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDesc);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://ai-ats-resume-analyzer-backend.onrender.com/analyze-resume",
        formData
      );

      console.log("ANALYZE RESPONSE:", res.data);
      setResult(res.data);

    } catch (err) {
      console.error("ANALYZE ERROR:", err.response?.data || err.message);
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  // ================= CHAT =================
  const handleChat = async () => {
    if (!userMessage) return;

    try {
      const res = await axios.post(
        "https://ai-ats-resume-analyzer-backend.onrender.com/chat",
        {
          user_id: "riya123",
          message: userMessage,
          resume_context: resumeText || "No resume context"
        }
      );

      console.log("CHAT RESPONSE:", res.data);
      setChatReply(res.data.reply);

    } catch (err) {
      console.error("CHAT ERROR:", err.response?.data || err.message);
      alert("Chat error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI ATS Resume Analyzer</h2>

      {/* Upload Resume */}
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Job Description */}
      <textarea
        placeholder="Enter job description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows="4"
        style={{ width: "100%", marginTop: "10px" }}
      />

      {/* Analyze Button */}
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* Result */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>ATS Score: {result.ats_score}</h3>

          <h4>Strengths:</h4>
          <ul>
            {result.strengths?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4>Weaknesses:</h4>
          <ul>
            {result.weaknesses?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4>Missing Skills:</h4>
          <ul>
            {result.missing_skills?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4>Improvement Tips:</h4>
          <ul>
            {result.improvement_tips?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4>Verdict: {result.verdict}</h4>
        </div>
      )}

      <hr />

      {/* ================= CHAT UI ================= */}
      <h2>Chat with AI</h2>

      <input
        type="text"
        placeholder="Ask something..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleChat}>Send</button>

      {chatReply && (
        <div style={{ marginTop: "20px" }}>
          <strong>AI Reply:</strong>
          <p>{chatReply}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
