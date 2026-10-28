
function PerformanceChart() {
  const values = [35, 55, 42, 75, 60, 90, 70]

  return (
    <section className="dashboard-panel">
      <h2>Performance Overview</h2>
      <p>Sample weekly performance</p>

      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          gap: '16px',
          height: '180px',
          padding: '20px 0',
        }}
      >
        {values.map((value, index) => (
          <div
            key={index}
            title={`${value}%`}
            style={{
              flex: 1,
              height: `${value}%`,
              background: '#6478f5',
              borderRadius: '6px 6px 0 0',
              minWidth: '12px',
            }}
          />
        ))}
      </div>

      <p>Mon · Tue · Wed · Thu · Fri · Sat · Sun</p>
    </section>
  )
}

export default PerformanceChart
