import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./AdminFeedback.css";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await API.get("feedback/admin/");
      const data = response.data;

      setFeedbacks(
        Array.isArray(data) ? data : data.results || []
      );
      setError("");
    } catch (err) {
      console.error("Admin feedback error:", err.response?.data || err);
      setError(
        err.response?.data?.detail ||
        "Unable to load feedback. Check your Admin access."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);

      await API.patch(`feedback/admin/${id}/`, { status });

      setFeedbacks((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );
    } catch (err) {
      console.error("Status update error:", err.response?.data || err);
      alert(
        err.response?.data?.detail ||
        "Status update failed."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`feedback/admin/${id}/`);

      setFeedbacks((previous) =>
        previous.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      alert("Could not delete feedback.");
    }
  };

  const formatDate = (value) =>
    new Date(value).toLocaleString("en-IN");

  const averageRating = feedbacks.length
    ? (
        feedbacks.reduce((sum, item) => sum + item.rating, 0) /
        feedbacks.length
      ).toFixed(1)
    : "0.0";

  const pendingCount = feedbacks.filter(
    (item) => item.status === "pending"
  ).length;

  const resolvedCount = feedbacks.filter(
    (item) => item.status === "resolved"
  ).length;

  return (
    <>
      <Sidebar />
      <Topbar />

      <main className="admin-feedback-page">
        <div className="admin-feedback-heading">
          <span>YTC ALUMNI PORTAL</span>
          <h1>Feedback Management</h1>
          <p>Review feedback submitted by students and alumni.</p>
        </div>

        <div className="admin-feedback-stats">
          <div className="admin-stat-card">
            <span>Total Feedback</span>
            <strong>{feedbacks.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Resolved</span>
            <strong>{resolvedCount}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Average Rating</span>
            <strong>★ {averageRating}/5</strong>
          </div>
        </div>

        <section className="admin-feedback-table-card">
          <h2>All Feedback</h2>

          {loading ? (
            <p>Loading feedback...</p>
          ) : error ? (
            <p className="admin-feedback-error">{error}</p>
          ) : feedbacks.length === 0 ? (
            <p>No feedback has been submitted yet.</p>
          ) : (
            <div className="admin-feedback-table-wrapper">
              <table className="admin-feedback-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Category</th>
                    <th>Rating</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {feedbacks.map((item) => (
                    <tr key={item.id}>
                      <td>{item.username || "User"}</td>

                      <td className="admin-category">
                        {item.category.replace("_", " ")}
                      </td>

                      <td className="admin-rating">
                        {"★".repeat(item.rating)}
                        <span>{"★".repeat(5 - item.rating)}</span>
                      </td>

                      <td className="admin-message">
                        {item.message}
                      </td>

                      <td>{formatDate(item.created_at)}</td>

                      <td>
                        <select
                          className="admin-status-select"
                          value={item.status}
                          disabled={updatingId === item.id}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="in_review">In Review</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>

                      <td>
                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default AdminFeedback;