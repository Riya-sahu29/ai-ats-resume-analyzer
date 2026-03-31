export default function Results({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-blue-100 text-gray-800 transition duration-300 hover:shadow-xl">

      <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">
        ATS Score: {result.ats_score ?? "N/A"}%
      </h2>

      <h3 className="text-base md:text-lg text-gray-900 font-semibold mb-4">
        Verdict: {result.verdict ?? "N/A"}
      </h3>

      <Section title="Strengths" items={result.strengths} />
      <Section title="Weaknesses" items={result.weakness} />
      <Section title="Missing Skills" items={result.missing_skills} />
      <Section title="Improvement Tips" items={result.improvement_tips} />

    </div>
  );
}

function Section({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h4 className="text-base md:text-lg text-gray-900 font-semibold mb-2">{title}</h4>
      <ul className="list-disc ml-6 text-gray-700 text-sm md:text-base space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
