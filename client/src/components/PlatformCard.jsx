const platforms = [
  { name: "YouTube", status: "Video platform", mark: "▶", className: "youtube" },
  {
    name: "Instagram",
    status: "Photo and video platform",
    mark: "◎",
    className: "instagram",
  },
  {
    name: "TikTok",
    status: "Short-form video platform",
    mark: "♪",
    className: "tiktok",
  },
];

function PlatformCard() {
  return (
    <section className="dashboard-panel" id="platforms">
      <div className="panel-heading">
        <div>
          <h2>Your platforms</h2>
          <p>Channels in your creator toolkit</p>
        </div>
      </div>

      <div className="platform-list">
        {platforms.map((platform) => (
          <div className="platform-item" key={platform.name}>
            <span
              className={`platform-logo ${platform.className}`}
              aria-hidden="true"
            >
              {platform.mark}
            </span>
            <span className="platform-info">
              <strong>{platform.name}</strong>
              <span>{platform.status}</span>
            </span>
            <span className="platform-arrow" aria-hidden="true">
              →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlatformCard;
