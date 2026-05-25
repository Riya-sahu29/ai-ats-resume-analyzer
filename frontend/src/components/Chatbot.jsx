import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../api/client";

export default function Chatbot({ userId, sessionId, resumeSummary = "" }) {
  const chatUserId = userId || sessionId || ("guest-" + Math.random().toString(36).slice(2, 10));

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I am your AI career advisor. Ask me anything about your resume, missing skills, interview tips, or career growth!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const data = await sendChatMessage(chatUserId, text, resumeSummary);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ " + (err.message || "Could not get a response. Please try again."),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white">

      {/* Header */}
      <div className="bg-blue-600 px-4 sm:px-5 py-3 sm:py-4">
        <p className="text-white font-bold text-sm sm:text-base">💬 AI Career Advisor</p>
        <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
          Ask about your resume · skills · interviews · career
        </p>
      </div>

      {/* Messages area
          Mobile:  h-72  (288px)
          Tablet:  h-96  (384px)
          Laptop:  h-[500px]
      */}
      <div className="overflow-y-auto p-3 sm:p-4 md:p-5 space-y-3
                      h-72 sm:h-96 md:h-[500px]
                      bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar for assistant */}
            {m.role === "assistant" && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">
                AI
              </div>
            )}

            <div
              className={`
                px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed
                max-w-[78%] sm:max-w-[70%] md:max-w-[65%]
                ${m.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                }
              `}
            >
              {m.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AI
            </div>
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="flex gap-2 p-2 sm:p-3 md:p-4 border-t border-gray-200 bg-white">
        <input
          className="
            flex-1 border border-gray-300 rounded-xl
            px-3 sm:px-4 py-2 sm:py-3
            text-xs sm:text-sm
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300
            text-gray-800 bg-white
          "
          placeholder="Type your question and press Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className={`
            px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold transition-all
            text-xs sm:text-sm shrink-0
            ${loading || !input.trim()
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm"
            }
          `}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

    </div>
  );
}


