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
    <div className="bg-white border-2 border-blue-500 p-6 rounded-xl shadow-lg max-w-3xl mx-auto transition duration-300 hover:shadow-2xl hover:-translate-y-1">

      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-black">
        AI Career Assistant
      </h2>

      {/* Chat messages */}
      <div className="bg-gray-50 h-80 overflow-y-auto p-4 rounded mb-4 border border-blue-200 text-sm md:text-base">
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
      <div className="flex flex-col sm:flex-row gap-2">

        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded border border-blue-300 bg-white text-black text-sm md:text-base outline-none w-full"
        />

        <button
          onClick={sendMessage}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm md:text-base"
        >
          Send
        </button>

      </div>

    </div>
  );
}
