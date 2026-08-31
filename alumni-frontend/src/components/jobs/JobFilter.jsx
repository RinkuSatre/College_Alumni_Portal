import React from "react";
import "./JobFilter.css";

const JobFilter = ({
  selectedType,
  setSelectedType,
  selectedLocation,
  setSelectedLocation,
}) => {
  return (
    <div className="job-filter">

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">All Job Types</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Internship">Internship</option>
      </select>

      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Satara">Satara</option>
      </select>

      <button
        onClick={() => {
          setSelectedType("");
          setSelectedLocation("");
        }}
      >
        Reset
      </button>

    </div>
  );
};

export default JobFilter;