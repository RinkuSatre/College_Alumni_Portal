import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Jobs.css";

import JobCard from "../../components/jobs/JobCard";
import JobSkeleton from "../../components/jobs/JobSkeleton";
import SearchBar from "../../components/jobs/SearchBar";
import JobFilter from "../../components/jobs/JobFilter";

import { getJobs } from "../../services/jobsApi";

const Jobs = () => {
  const currentUser = JSON.parse(
      localStorage.getItem("user")
  );
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await getJobs();

      setJobs(response.data);
      setFilteredJobs(response.data);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...jobs];

    if (search) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company_name.toLowerCase().includes(search.toLowerCase()) ||
          job.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedType) {
      result = result.filter(
        (job) => job.job_type === selectedType
      );
    }

    if (selectedLocation) {
      result = result.filter(
        (job) => job.location === selectedLocation
      );
    }

    setFilteredJobs(result);
  }, [jobs, search, selectedType, selectedLocation]);

  if (loading) {
    return (
      <div className="jobs-container">
        <div className="jobs-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <JobSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="jobs-container">

      <div className="jobs-header">

        <div>
          <h1>Find Your Dream Job</h1>
          <p>Explore opportunities shared by alumni.</p>
        </div>

        {(currentUser?.role === "alumni" ||
          currentUser?.role === "admin") && (

          <Link
            to="/jobs/create"
            className="create-job-btn"
          >
            + Create Job
          </Link>

        )}

      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <JobFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <h3 className="job-count">
        {filteredJobs.length} Job(s) Found
      </h3>

      {filteredJobs.length === 0 ? (
        <div className="no-jobs">
          <h2>No Jobs Found</h2>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Jobs;