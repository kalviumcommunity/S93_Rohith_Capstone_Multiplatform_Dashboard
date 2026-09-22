import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import PerformanceChart from "../components/PerformanceChart";
import PlatformCard from "../components/PlatformCard";
import TopContent from "../components/TopContent";

function Dashboard() {
  return (
    <>
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="stats">
          <StatCard title="Total Views" value="2.48M" />
          <StatCard title="Engagement Rate" value="9.76%" />
          <StatCard title="Total Content" value="128" />
        </div>

        <PerformanceChart />

        <PlatformCard />

        <TopContent />
      </div>
    </>
  );
}

export default Dashboard;