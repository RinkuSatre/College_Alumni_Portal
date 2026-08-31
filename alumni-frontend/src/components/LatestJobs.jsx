import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LatestJobs.css";

function LatestJobs() {

  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/api/jobs/")
      .then((response) => {

        setJobs(response.data);

      })
      .catch((error) => {

        console.log("Error fetching jobs:", error);

      });

  }, []);

  const handleApply = (jobId) => {

    navigate(`/apply-job/${jobId}`);

  };

  return (

    <section className="jobs" id="jobs">

      <h2>Latest Job Opportunities</h2>

      <p>
        Jobs shared by our Alumni Network.
      </p>


      <div className="job-grid">


        {jobs.map((job) => (

          <div className="job-card" key={job.id}>


            <h3>
              {job.company_name}
            </h3>


            <h4>
              {job.title}
            </h4>


            <p>
              📍 {job.location}
            </p>


            <p>
              💰 {job.salary}
            </p>


            <p>
              👨‍💻 Experience: {job.experience} Years
            </p>


            <span>
              {job.job_type}
            </span>


            <p>
              📅 Last Date: {job.last_date}
            </p>


            <button onClick={() => handleApply(job.id)}>
              Apply Now
            </button>


          </div>

        ))}


      </div>


    </section>

  );

}

export default LatestJobs;