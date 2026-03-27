import React from "react";

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Simple & Transparent Pricing
        </h2>

        <p className="text-gray-600 text-sm md:text-base mb-12">
          Start free. Upgrade when you need more powerful AI features.
        </p>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-md p-8 border transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Free Plan</h3>

            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              ₹0
              <span className="text-gray-500 text-base md:text-lg"> / forever</span>
            </p>

            <ul className="text-gray-600 space-y-2 mb-6">
              <li>✅ ATS Resume Score</li>
              <li>✅ Skill Gap Analysis</li>
              <li>✅ Job Match Feedback</li>
              <li>✅ Improvement Tips</li>
            </ul>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Get Started Free
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md p-8 hover:shadow-lg transition relative">

            {/* Badge */}
            <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
              Coming Soon
            </span>

            <h3 className="text-lg md:text-xl font-semibold mb-2">Premium Plan</h3>

            <p className="text-3xl md:text-4xl font-bold mb-4">
              ₹199
              <span className="text-base md:text-lg opacity-80"> / month</span>
            </p>

            <ul className="space-y-2 mb-6 opacity-90">
              <li>🚀 Unlimited Resume Analysis</li>
              <li>🚀 Advanced ATS Insights</li>
              <li>🚀 AI Resume Rewrite</li>
              <li>🚀 Priority Processing</li>
            </ul>

            <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
              Notify Me
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
