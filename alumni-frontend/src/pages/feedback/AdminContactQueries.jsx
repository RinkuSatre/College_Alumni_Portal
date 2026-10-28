
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./AdminContactQueries.css";

function AdminContactQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("feedback/contact/admin/");
      setQueries(
        Array.isArray(response.data)
          ? response.data
          : response.data.results || []
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to load contact queries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setMessage("");
      await API.patch(`feedback/contact/admin/${id}/`, { status });

      setQueries((previous) =>
        previous.map((query) =>
          query.id === id ? { ...query, status } : query
        )
      );

      setMessage("Query status updated successfully.");
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          "Unable to update query status."
      );
    }
  };

  const deleteQuery = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this query?"
    );

    if (!confirmed) return;

    try {
      setMessage("");
      await API.delete(`feedback/contact/admin/${id}/`);

      setQueries((previous) =>
        previous.filter((query) => query.id !== id)
      );

      setMessage("Query deleted successfully.");
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          "Unable to delete query."
      );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h2>Contact Queries Management</h2>
          <p>View and manage queries submitted through the Contact Us form.</p>

          {message && <p>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {loading ? (
            <p>Loading contact queries...</p>
          ) : queries.length === 0 ? (
            <p>No contact queries found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th style={cellStyle}>Name</th>
                    <th style={cellStyle}>Contact</th>
                    <th style={cellStyle}>Subject</th>
                    <th style={cellStyle}>Query Message</th>
                    <th style={cellStyle}>Date</th>
                    <th style={cellStyle}>Status</th>
                    <th style={cellStyle}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {queries.map((query) => (
                    <tr key={query.id}>
                      <td style={cellStyle}>{query.name}</td>

                      <td style={cellStyle}>
                        <div>{query.email}</div>
                        <div>{query.phone}</div>
                      </td>

                      <td style={cellStyle}>{query.subject}</td>

                      <td style={{ ...cellStyle, minWidth: "220px" }}>
                        {query.message}
                      </td>

                      <td style={cellStyle}>
                        {query.created_at
                          ? new Date(query.created_at).toLocaleString()
                          : "-"}
                      </td>

                      <td style={cellStyle}>
                        <select
                          value={query.status}
                          onChange={(e) =>
                            updateStatus(query.id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="in_review">In Review</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>

                      <td style={cellStyle}>
                        <button
                          type="button"
                          onClick={() => deleteQuery(query.id)}
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
        </div>
      </div>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  verticalAlign: "top",
};

export default AdminContactQueries;
