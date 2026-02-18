import { useState } from "react";

export default function Chatbot() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);

    setMessage("");

    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "riya",
        message: message,
      }),
    });

    const data = await res.json();

    setChat([...newChat, { sender: "bot", text: data.reply }]);   
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold text-center mb-4">
        AI Career Assistant
      </h2>

      {/* Chat messages */}
      <div className="bg-slate-800 h-80 overflow-y-auto p-4 rounded mb-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user"
                ? "text-right text-blue-400"
                : "text-left text-green-400"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">

        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded bg-slate-700 text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>

      </div>

    </div>
  );
}
