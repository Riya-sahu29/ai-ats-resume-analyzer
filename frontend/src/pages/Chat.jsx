import Chatbot from "../components/Chatbot";

export default function Chat() {
  return (
    <div className="min-h-screen bg-blue-50 px-4 py-6 flex justify-center">
      <div className="w-full max-w-md">
        <Chatbot />
      </div>
    </div>
  );
}