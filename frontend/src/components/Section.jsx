
export default function Section({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="section-card">
      <h4 className="section-title">{title}</h4>

      <ul className="section-list">
        {items.map((item, i) => (
          <li key={i} className="section-item">
            <span className="bullet">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
