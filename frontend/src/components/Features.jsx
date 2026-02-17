

// import React from "react";

// const Features = () => {
//   return (
//     <div className="features-grid">
//       <div className="feature-card">
//         <div className="icon">📄</div>
//         <h3>Resume ATS Scoring</h3>
//         <p>Get instant feedback on how ATS systems read your resume.</p>
//       </div>

//       <div className="feature-card">
//         <div className="icon">🧠</div>
//         <h3>AI Skill Gap Analysis</h3>
//         <p>Identify missing skills and improve your profile.</p>
//       </div>

//       <div className="feature-card">
//         <div className="icon">💼</div>
//         <h3>Job Match Feedback</h3>
//         <p>See how well your resume matches job postings.</p>
//       </div>

//       <div className="feature-card">
//         <div className="icon">🚀</div>
//         <h3>Hiring Readiness Score</h3>
//         <p>Measure your overall readiness for recruiters.</p>
//       </div>
//     </div>
//   );
// };

// export default Features;


import React from "react";

const Features = () => {
  const features = [
    {
      icon: "📄",
      title: "Resume ATS Scoring",
      desc: "Get instant feedback on how ATS systems read your resume.",
    },
    {
      icon: "🧠",
      title: "AI Skill Gap Analysis",
      desc: "Identify missing skills and improve your profile.",
    },
    {
      icon: "💼",
      title: "Job Match Feedback",
      desc: "See how well your resume matches job postings.",
    },
    {
      icon: "🚀",
      title: "Hiring Readiness Score",
      desc: "Measure your overall readiness for recruiters.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-950">
      
      {/* Section Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white">
          Powerful AI Features
        </h2>
        <p className="text-gray-400 mt-3">
          Everything you need to optimize your resume and get hired faster
        </p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {features.map((feature, index) => (
          <div
            key={index}
            className="
              bg-gray-900 
              border border-gray-800 
              rounded-xl 
              p-6 
              text-center 
              hover:border-indigo-500 
              hover:scale-105 
              transition-all duration-300
              shadow-lg hover:shadow-indigo-500/20
            "
          >
            
            {/* Icon */}
            <div className="text-5xl mb-4">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm">
              {feature.desc}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Features;
