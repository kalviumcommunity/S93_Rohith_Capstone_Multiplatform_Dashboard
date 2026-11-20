const icons = {
  "Total Views": "◉",
  "Engagement Rate": "↗",
  "Total Content": "▤",
};

function StatCard({ title, value }) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <h3>{title}</h3>
        <span className="stat-icon" aria-hidden="true">
          {icons[title] || "•"}
        </span>
      </div>
      <p className="stat-card-value">{value}</p>
      <p className="stat-card-caption">Sample dashboard metric</p>
    </article>
  );
}

export default StatCard;
