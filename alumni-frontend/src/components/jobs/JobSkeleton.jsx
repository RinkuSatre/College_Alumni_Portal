import React from "react";
import "./JobSkeleton.css";

const JobSkeleton = () => {
  return (
    <div className="job-skeleton-card">
      <div className="skeleton skeleton-title"></div>

      <div className="skeleton skeleton-company"></div>

      <div className="skeleton skeleton-line"></div>

      <div className="skeleton skeleton-line short"></div>

      <div className="skeleton skeleton-button"></div>
    </div>
  );
};

export default JobSkeleton;