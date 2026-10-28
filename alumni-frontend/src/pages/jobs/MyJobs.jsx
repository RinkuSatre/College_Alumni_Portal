
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./MyJobs.css";

function MyJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await API.get("jobs/my-jobs/");
        const data = response.data;
        setJobs(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("My Jobs Error:", err);
        setError("Unable to load your jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  return (
    <>
      <Sidebar />
      <Topbar />

      <main className="my-jobs-page">
        <button
          className="my-jobs-back-btn"
          onClick={() => navigate("/alumni/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="my-jobs-header">
          <div>
            <h2>💼 My Posted Jobs</h2>
            <p>Manage the job opportunities you have posted.</p>
          </div>

          <span className="my-jobs-count">
            My Jobs: {jobs.length}
          </span>
        </div>

        {loading ? (
          <div className="my-jobs-message">
            <p>Loading your jobs...</p>
          </div>
        ) : error ? (
          <div className="my-jobs-message my-jobs-error">
            <h3>Unable to Load Jobs</h3>
            <p>{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="my-jobs-message">
            <h3>No Jobs Posted Yet</h3>
            <p>You have not posted any jobs yet.</p>
          </div>
        ) : (
          <>
            <h3 className="my-jobs-section-title">
              Your Posted Jobs ({jobs.length})
            </h3>

            <div className="my-jobs-list">
              {jobs.map((job) => (
                <article className="my-job-card" key={job.id}>
                  <h3>{job.title}</h3>

                  <p>
                    <strong>Company:</strong> {job.company}
                  </p>

                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>

                  <p>
                    <strong>Job Type:</strong> {job.job_type}
                  </p>

                  <p>
                    <strong>Experience:</strong> {job.experience}
                  </p>

                  <button
                    className="my-job-view-btn"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    View Job →
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default MyJobs;
