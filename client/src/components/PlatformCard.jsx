
function PlatformCard() {
  const platforms = [
    { name: 'YouTube', status: 'Video platform' },
    { name: 'Instagram', status: 'Photo and video platform' },
    { name: 'TikTok', status: 'Short video platform' },
  ]

  return (
    <section className="dashboard-panel">
      <h2>Connected Platforms</h2>

      <div className="platform-list">
        {platforms.map((platform) => (
          <div className="platform-item" key={platform.name}>
            <strong>{platform.name}</strong>
            <span>{platform.status}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PlatformCard
