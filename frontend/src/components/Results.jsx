export default function Results({ result }) {
  if (!result) return null;

  const score = typeof result.ats_score === "number" ? result.ats_score : 0;

  const scoreColor =
    score >= 70 ? "text-green-600" :
    score >= 40 ? "text-yellow-600" :
    "text-red-500";

  const scoreBg =
    score >= 70 ? "bg-green-50 border-green-200" :
    score >= 40 ? "bg-yellow-50 border-yellow-200" :
    "bg-red-50 border-red-200";

  const verdictColor =
    result.verdict === "Hire"   ? "bg-green-100 text-green-800" :
    result.verdict === "Maybe"  ? "bg-yellow-100 text-yellow-800" :
    result.verdict === "Reject" ? "bg-red-100 text-red-700" :
    "bg-gray-100 text-gray-600";

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* Error banner */}
      {result.error && (
        <div className="p-3 bg-orange-50 border border-orange-300 rounded-xl text-xs sm:text-sm text-orange-700">
          ⚠️ {result.error}
        </div>
      )}

      {/* Cache badge */}
      {result.from_cache && (
        <div className="text-right">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            ⚡ Instant result from cache
          </span>
        </div>
      )}

      {/* Score card */}
      <div className={`border rounded-xl p-4 sm:p-6 text-center ${scoreBg}`}>
        <p className="text-xs sm:text-sm text-gray-500 mb-1">ATS Score</p>
        <p className={`text-5xl sm:text-6xl font-bold ${scoreColor}`}>
          {score}
          <span className="text-xl sm:text-2xl text-gray-400">/100</span>
        </p>
        {result.verdict && (
          <span className={`inline-block mt-3 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold ${verdictColor}`}>
            Verdict: {result.verdict}
          </span>
        )}
      </div>

      {/* Results grid — 1 col on mobile, 2 col on tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <ListSection
          title="💪 Strengths"
          items={result.strengths}
          color="text-green-700"
          emptyMsg="No strengths detected"
        />
        <ListSection
          title="⚠️ Weaknesses"
          items={result.weaknesses}
          color="text-red-600"
          emptyMsg="No weaknesses detected"
        />
        <ListSection
          title="🔍 Missing Skills"
          items={result.missing_skills}
          color="text-orange-600"
          emptyMsg="No missing skills found"
        />
        <ListSection
          title="🔧 Improvement Tips"
          items={result.improvement_tips}
          color="text-blue-700"
          emptyMsg="No tips available"
        />
      </div>

    </div>
  );
}

function ListSection({ title, items = [], color, emptyMsg }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
      <p className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm">{title}</p>
      {!items || items.length === 0 ? (
        <p className="text-gray-400 text-xs">{emptyMsg}</p>
      ) : (
        <ul className="space-y-1 sm:space-y-2">
          {items.map((item, i) => (
            <li key={i} className={`text-xs sm:text-sm ${color} flex gap-2`}>
              <span className="mt-0.5 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}