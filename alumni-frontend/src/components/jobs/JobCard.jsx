import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

const JobCard = ({ job }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h2>{job.title}</h2>
          <h4>{job.company_name}</h4>
        </div>

        <span className={`job-badge ${job.job_type.toLowerCase().replace(/\s+/g, "-")}`}>
          {job.job_type}
        </span>
        <span className={`status-badge status-${(job.status || "Active").toLowerCase()}`}>
          {job.status || "Active"}
        </span>
      </div>

      <div className="job-info">
        <p>📍 {job.location}</p>
        <p>💰 {job.salary}</p>
        <p>👨‍💻 {job.experience} Year{job.experience > 1 ? "s" : ""} Experience</p>
      </div>

      <p className="job-description">
        {job.description.length > 140
          ? job.description.substring(0, 140) + "..."
          : job.description}
      </p>

      <div className="job-footer">
        <div>
          <small>Posted By: <strong>{job.posted_by_name}</strong></small>
          <br />
          <small>Last Date: {formatDate(job.last_date)}</small>
        </div>

        <Link to={`/jobs/${job.id}`} className="details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;