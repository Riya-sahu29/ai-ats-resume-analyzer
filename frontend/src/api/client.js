import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
});

export async function analyzeResume(resumeFile, jobDescription, onRetry) {
  const formData = new FormData();

  formData.append("file", resumeFile);
  formData.append("job_description", jobDescription);

  const MAX_RETRIES = 2;
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 1 && onRetry) {
        onRetry(attempt);
      }

      const response = await apiClient.post(
        "/analyze-resume/",
        formData
      );

      return response.data;

    } catch (err) {
      lastError = err;

      console.error("Full ERROR:", err);

      if (
        err.response?.status >= 400 &&
        err.response?.status < 500
      ) {
        break;
      }

      if (attempt < MAX_RETRIES) {
        await sleep(2000);
      }
    }
  }

  const serverMsg =
    lastError?.response?.data?.error ||
    lastError?.response?.data?.detail;

  const isTimeout =
    lastError?.code === "ECONNABORTED" ||
    lastError?.message?.includes("timeout");

  const message =
    serverMsg ||
    (isTimeout
      ? "Request timed out. Please try again."
      : "Network error. Please check your connection.");

  throw new Error(message);
}

export async function sendChatMessage(
  userId,
  message,
  resumeContext = ""
) {
  try {
    const response = await apiClient.post("/chat", {
      user_id: userId,
      message,
      resume_context: resumeContext,
    });

    return response.data;

  } catch (err) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.detail ||
      "Failed to get response. Please try again.";

    throw new Error(msg);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
