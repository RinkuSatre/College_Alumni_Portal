import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./Dashboard.css";

function AdminDashboard() {

  const [stats, setStats] = useState({
    total_students: 0,
    total_alumni: 0,
    total_jobs: 0,
    total_events: 0,
    total_questions: 0,
    total_applications: 0,
    total_reward_points: 0,
    total_notifications: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const response = await API.get(
        "accounts/admin-dashboard-stats/"
      );

      setStats(response.data);

    } catch (error) {

      console.log("Admin Dashboard Error:", error);

    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="dashboard-content">

        <h2>Admin Dashboard 👨‍💼</h2>
        <p className="dashboard-subtitle">
          Manage and monitor the YTC Alumni Portal
        </p>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>👨‍🎓</h3>
            <p>Total Students</p>
            <h2>{stats.total_students}</h2>
          </div>

          <div className="stat-card">
            <h3>🎓</h3>
            <p>Total Alumni</p>
            <h2>{stats.total_alumni}</h2>
          </div>

          <div className="stat-card">
            <h3>💼</h3>
            <p>Total Jobs</p>
            <h2>{stats.total_jobs}</h2>
          </div>

          <div className="stat-card">
            <h3>📅</h3>
            <p>Total Events</p>
            <h2>{stats.total_events}</h2>
          </div>

          <div className="stat-card">
            <h3>💬</h3>
            <p>Forum Questions</p>
            <h2>{stats.total_questions}</h2>
          </div>

          <div className="stat-card">
            <h3>📝</h3>
            <p>Job Applications</p>
            <h2>{stats.total_applications}</h2>
          </div>

          <div className="stat-card">
            <h3>🏆</h3>
            <p>Reward Points</p>
            <h2>{stats.total_reward_points}</h2>
          </div>

          <div className="stat-card">
            <h3>🔔</h3>
            <p>Notifications</p>
            <h2>{stats.total_notifications}</h2>
          </div>

        </div>

        <div className="admin-sections">

          <Link to="/admin/reports" className="admin-card report-card">
              <h2>📊 Reports</h2>
              <p>View and generate detailed portal reports.</p>
          </Link>

          <div className="admin-box">
            <h3>👥 User Management</h3>
            <p>
              Monitor students and alumni registered on the portal.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;