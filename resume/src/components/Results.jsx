export default function Results({ result }) {
  if (!result) return null;

  return (
    <div className="mt-6 space-y-4 bg-black/40 p-6 rounded border border-white/10">

      <h2 className="text-xl font-bold">
        ATS Score: {result.ats_score ?? "N/A"}%
      </h2>

      <h3>
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
      <h4 className="font-semibold mt-3">{title}</h4>
      <ul className="list-disc ml-6 text-gray-300">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
