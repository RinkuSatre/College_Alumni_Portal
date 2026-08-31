import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./Dashboard.css";

function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [points, setPoints] = useState(0);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [events, setEvents] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchRewardPoints();
    fetchJobs();
    fetchApplications();
    fetchEvents();
    fetchQuestions();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("profiles/student/");
      setProfile(response.data);
    } catch (error) {
      console.log("Profile Error", error);
    }
  };

  const fetchRewardPoints = async () => {
    try {
      const response = await API.get("rewards/total/");
      setPoints(response.data.total_points || 0);
    } catch (error) {
      console.log("Reward Error", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await API.get("jobs/");
      setJobs(response.data.results || response.data);
    } catch (error) {
      console.log("Jobs Error", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await API.get("jobs/my-applications/");
      setApplications(response.data);
    } catch (error) {
      console.log("Applications Error", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await API.get("events/my-events/");
      setEvents(response.data);
    } catch (error) {
      console.log("Events Error", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await API.get("forum/my-questions/");
      setQuestions(response.data);
    } catch (error) {
      console.log("Questions Error", error);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="dashboard-content">

        <div className="welcome-card">

          <h2>
            👋 Welcome {profile?.full_name || "Student"}
          </h2>

          <p>
            {profile?.department} | {profile?.course} | Year {profile?.year}
          </p>

        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>💼 Applied Jobs</h3>
            <p>{applications.length}</p>
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
            <h3>💬 Questions</h3>
            <p>{questions.length}</p>
          </div>

        </div>

        <div className="dashboard-section">

          <h2>🔥 Latest Jobs</h2>

          {
            jobs.slice(0,3).map((job)=>(
              <div
                className="dashboard-list"
                key={job.id}
              >
                <h4>{job.title}</h4>

                <p>
                  {job.company_name}
                </p>

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

          <h2>💬 My Recent Questions</h2>

          {
            questions.length > 0 ? (

              questions.slice(0, 3).map((question) => (

                <div
                  className="dashboard-list"
                  key={question.id}
                >
                  <h4>{question.title}</h4>

                  <p>
                    {question.created_at}
                  </p>

                </div>

              ))

            ) : (

              <p>No Questions Found</p>

            )
          }

        </div>

      </div>

    </>
  );
}

export default StudentDashboard;