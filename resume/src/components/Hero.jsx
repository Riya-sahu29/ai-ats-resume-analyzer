import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6">

      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold mb-6">
          AI-Powered Resume <span className="text-indigo-500">Analyzer</span>
        </h1>

        <p className="text-gray-400 mb-8">
          Improve ATS score and get hired faster using AI insights.
        </p>

        <Link to="/analyzer">
          <button className="px-6 py-3 bg-indigo-600 rounded text-white">
            Analyze My Resume
          </button>
        </Link>
      </div>

    </section>
  );
}
