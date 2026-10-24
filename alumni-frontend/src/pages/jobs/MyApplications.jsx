import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";

import "./MyApplications.css";

function MyApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get("jobs/my-applications/");

      setApplications(
        response.data.results || response.data
      );
    } catch (error) {
      console.log("Applications Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="my-applications-container">

        <div className="applications-header">
          <div>
            <h2>💼 My Applied Jobs</h2>
            <p>
              Jobs you have applied for
            </p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/student/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        {loading ? (
          <p className="loading-text">
            Loading applications...
          </p>
        ) : applications.length === 0 ? (
          <div className="no-applications">
            <h3>📭 No Applications Yet</h3>

            <p>
              You have not applied for any jobs yet.
            </p>

            <button
              onClick={() => navigate("/jobs")}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="applications-grid">

            {applications.map((application) => (

              <div
                className="application-card"
                key={application.id}
              >

                <h3>
                  💼 {application.job_title}
                </h3>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="status">
                    {application.status}
                  </span>
                </p>

                <p>
                  <strong>Applied On:</strong>{" "}
                  {application.applied_at
                    ? new Date(
                        application.applied_at
                      ).toLocaleDateString("en-IN")
                    : "N/A"}
                </p>

                {application.resume && (
                  <a
                    href={
                      application.resume.startsWith("http")
                        ? application.resume
                        : `http://127.0.0.1:8000${application.resume}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-btn"
                  >
                    📄 View Resume
                  </a>
                )}

              </div>

            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default MyApplications;