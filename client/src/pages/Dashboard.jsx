import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import PerformanceChart from "../components/PerformanceChart";
import PlatformCard from "../components/PlatformCard";
import TopContent from "../components/TopContent";
import "../App.css";

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar user={user} onLogout={onLogout} />

        <div className="dashboard-content">
          <section className="welcome-row" id="overview">
            <div>
              <p className="eyebrow">YOUR SOCIAL SNAPSHOT</p>
              <h1>Overview</h1>
              <p className="welcome-copy">
                A clearer view of your content and channels, all in one place.
              </p>
            </div>
            <div className="period-pill">
              <span className="period-dot" aria-hidden="true" />
              Reporting period <strong>Last 7 days</strong>
            </div>
          </section>

          <section className="stats" aria-label="Key metrics">
            <StatCard title="Total Views" value="2.48M" />
            <StatCard title="Engagement Rate" value="9.76%" />
            <StatCard title="Total Content" value="128" />
          </section>

          <div className="dashboard-grid">
            <PerformanceChart />
            <PlatformCard />
          </div>

          <TopContent />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;