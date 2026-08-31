import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./Dashboard.css";

function AlumniDashboard() {

  const [profile, setProfile] = useState(null);

  const [points, setPoints] = useState(0);

  const [jobs, setJobs] = useState([]);

  const [events, setEvents] = useState([]);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchRewardPoints();
    fetchJobs();
    fetchEvents();
    fetchAnswers();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("profiles/alumni/");
      setProfile(response.data);
    } catch (error) {
      console.log("Profile Error :", error);
    }
  };

  const fetchRewardPoints = async () => {
    try {
      const response = await API.get("rewards/total/");
      setPoints(response.data.total_points || 0);
    } catch (error) {
      console.log("Reward Error :", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await API.get("jobs/");
      setJobs(response.data.results || response.data);
    } catch (error) {
      console.log("Jobs Error :", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await API.get("events/my-events/");
      setEvents(response.data);
    } catch (error) {
      console.log("Events Error :", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await API.get("forum/my-answers/");
      setAnswers(response.data);
    } catch (error) {
      console.log("Forum Error :", error);
    }
  };

  return (
    <>
      <Sidebar />

      <Topbar />

      <div className="dashboard-content">

        <div className="welcome-card">

          <h2>
            👋 Welcome {profile?.full_name || "Alumni"}
          </h2>

          <p>
            {profile?.job_title} | {profile?.company_name}
          </p>

        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>💼 Jobs</h3>
            <p>{jobs.length}</p>
          </div>

          <div className="dashboard-card">
            <h3>📅 My Events</h3>
            <p>{events.length}</p>
          </div>

          <div className="dashboard-card">
            <h3>🏆 Reward Points</h3>
            <p>{points}</p>
          </div>

          <div className="dashboard-card">
            <h3>💬 My Answers</h3>
            <p>{answers.length}</p>
          </div>

        </div>

        <div className="dashboard-section">

          <h2>💼 Latest Jobs</h2>

          {
            jobs.slice(0,3).map((job)=>(
              <div
                className="dashboard-list"
                key={job.id}
              >
                <h4>{job.title}</h4>

                <p>{job.company_name}</p>

              </div>
            ))
          }

        </div>
                <div className="dashboard-section">

          <h2>📅 My Upcoming Events</h2>

          {
            events.length > 0 ? (

              events.slice(0, 3).map((event) => (

                <div
                  className="dashboard-list"
                  key={event.id}
                >
                  <h4>{event.title}</h4>

                  <p>
                    {event.event_date || event.date}
                  </p>

                </div>

              ))

            ) : (

              <p>No Events Registered</p>

            )
          }

        </div>

        <div className="dashboard-section">

          <h2>💬 My Recent Answers</h2>

          {
            answers.length > 0 ? (

              answers.slice(0, 3).map((answer) => (

                <div
                  className="dashboard-list"
                  key={answer.id}
                >

                  <h4>
                    ❓ {answer.question_title}
                  </h4>

                  <p
                    style={{
                      marginTop: "10px",
                      color: "#555",
                      lineHeight: "1.7",
                    }}
                  >
                    <strong>💬 Your Answer:</strong><br />
                    {answer.answer}
                  </p>

                  <small
                    style={{
                      color: "#888",
                    }}
                  >
                    📅 {new Date(answer.created_at).toLocaleDateString()}
                  </small>

                </div>
              ))

            ) : (

              <p>No Answers Yet</p>

            )
          }

        </div>

        <div className="dashboard-section">

          <h2>👤 Professional Summary</h2>

          <div className="dashboard-list">

            <p><strong>🏢 Company :</strong> {profile?.company_name || "-"}</p>

            <p><strong>💼 Job Title :</strong> {profile?.job_title || "-"}</p>

            <p><strong>📍 City :</strong> {profile?.current_city || "-"}</p>

            <p><strong>🎓 Passout Year :</strong> {profile?.passout_year || "-"}</p>

            <p><strong>⭐ Experience :</strong> {profile?.experience || 0} Years</p>

          </div>

        </div>

      </div>

    </>
  );
}

export default AlumniDashboard;