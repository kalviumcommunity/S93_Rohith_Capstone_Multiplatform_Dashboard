const values = [35, 55, 42, 75, 60, 90, 70];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function PerformanceChart() {
  return (
    <section className="dashboard-panel" id="performance">
      <div className="panel-heading">
        <div>
          <h2>Performance overview</h2>
          <p>Sample weekly performance</p>
        </div>
        <span className="sample-badge">LAST 7 DAYS</span>
      </div>

      <div
        className="chart-wrap"
        role="img"
        aria-label="Sample weekly performance: Monday 35 percent, Tuesday 55 percent, Wednesday 42 percent, Thursday 75 percent, Friday 60 percent, Saturday 90 percent, Sunday 70 percent"
      >
        <div className="chart-axis" aria-hidden="true">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
        </div>
        <div className="chart-plot">
          {values.map((value, index) => (
            <div className="chart-bar-column" key={days[index]}>
              <div className="chart-bar-track">
                <div
                  className="chart-bar"
                  style={{ height: `${value}%` }}
                  title={`${days[index]}: ${value}%`}
                />
              </div>
              <span className="chart-day" style={{ left: `${(index + 0.5) * (100 / values.length)}%` }}>
                {days[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-legend">
        <span className="legend-dot" aria-hidden="true" />
        Engagement
      </div>
    </section>
  );
}

export default PerformanceChart;
