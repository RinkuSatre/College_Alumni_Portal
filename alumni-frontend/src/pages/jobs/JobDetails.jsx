import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import API from "../../api/axios";
import { getJobById } from "../../services/jobsApi";

import "./JobDetails.css";

const JobDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {

    try {

      const res = await getJobById(id);

      setJob(res.data);

      setError("");

    } catch (err) {

      console.error(err);

      setError("Job not found.");

    } finally {

      setLoading(false);

    }

  };

  const handleApply = () => {

    navigate(`/apply-job/${job.id}`);

  };

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`jobs/${id}/`);

      alert("✅ Job Deleted Successfully");

      navigate("/jobs");

    } catch (error) {

      console.log(error);

      alert("Failed to Delete Job");

    }

  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (loading) {

    return (
      <div className="job-details-container">
        <h2>Loading...</h2>
      </div>
    );

  }

  if (error) {

    return (
      <div className="job-details-container">
        <h2>{error}</h2>
      </div>
    );

  }

  const isStudent =
    currentUser?.role === "student";

  const isAdmin =
    currentUser?.role === "admin";

  const isOwner =
    currentUser?.id === job?.posted_by_id;

  return (

    <div className="job-details-container">

      <div className="job-details-card">

        <h1>{job.title}</h1>

        <h3>{job.company_name}</h3>

        <div className="details-grid">

          <div>
            📍 <strong>Location:</strong> {job.location}
          </div>

          <div>
            💰 <strong>Salary:</strong> {job.salary}
          </div>

          <div>
            👨‍💻 <strong>Experience:</strong> {job.experience} Year(s)
          </div>

          <div>
            🏷 <strong>Job Type:</strong> {job.job_type}
          </div>

          <div>
            📅 <strong>Last Date:</strong> {formatDate(job.last_date)}
          </div>

          <div>
            👤 <strong>Posted By:</strong> {job.posted_by_name}
          </div>

        </div>

        <div className="description">

          <h2>Job Description</h2>

          <p>{job.description}</p>

        </div>

        <div className="job-buttons">

          {isStudent && (

            <button
              className="apply-btn"
              onClick={handleApply}
            >
              Apply Now
            </button>

          )}

          {(isOwner || isAdmin) && (

            <>
              <button
                className="edit-btn"
                onClick={() =>
                  navigate(`/jobs/${id}/edit`)
                }
              >
                ✏ Edit Job
              </button>

              <button
                  className="view-btn"
                  onClick={() => navigate(`/jobs/${id}/applicants`)}
              >
                  👥 View Applicants
              </button>

              <button
                className="delete-btn"
                onClick={handleDelete}
              >
                🗑 Delete Job
              </button>
            </>

          )}

          <button
              className="back-btn"
              onClick={() => navigate("/jobs")}
          >
              Back
          </button>

        </div>

      </div>

    </div>

  );

};

export default JobDetails;