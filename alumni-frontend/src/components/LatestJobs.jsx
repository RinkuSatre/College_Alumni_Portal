import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./LatestJobs.css";

function LatestJobs() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get("jobs/");

        const data = response.data.results || response.data;

        const latestJobs = data
          .filter((job) => {
            const today = new Date().toISOString().split("T")[0];

            return job.is_active && job.last_date >= today;
          })
          .sort(
            (a, b) =>
              new Date(b.created_at) - new Date(a.created_at)
          )
          .slice(0, 3);

        setJobs(latestJobs);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    navigate(`/apply-job/${jobId}`);
  };

  return (
    <section className="jobs" id="jobs">
      <h2>Latest Job Opportunities</h2>

      <p>Jobs shared by our Alumni Network.</p>

      <div className="job-grid">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.company_name}</h3>

              <h4>{job.title}</h4>

              <p>📍 {job.location}</p>

              <p>💰 {job.salary || "Salary not disclosed"}</p>

              <p>👨‍💻 Experience: {job.experience} Years</p>

              <span>{job.job_type}</span>

              <p>📅 Last Date: {job.last_date}</p>

              <button onClick={() => handleApply(job.id)}>
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p>No latest job opportunities available.</p>
        )}
      </div>

      <div className="view-all-events">
        <Link to="/jobs">View All Jobs</Link>
      </div>
    </section>
  );
}

export default LatestJobs;