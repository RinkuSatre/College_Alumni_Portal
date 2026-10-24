import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";

import "./MyEvents.css";

function MyEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get("events/my-events/");

      setEvents(
        response.data.results || response.data
      );
    } catch (error) {
      console.log("My Events Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="my-events-container">

        <div className="my-events-header">
          <div>
            <h2>📅 My Registered Events</h2>
            <p>
              Events you have registered for
            </p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/student/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        {loading ? (
          <p className="loading-text">
            Loading events...
          </p>
        ) : events.length === 0 ? (
          <div className="no-events">
            <h3>📭 No Events Registered</h3>

            <p>
              You have not registered for any events yet.
            </p>

            <button
              onClick={() => navigate("/events")}
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="events-grid">

            {events.map((event) => (

              <div
                className="my-event-card"
                key={event.id}
              >

                <h3>
                  📅 {event.event_title || event.title}
                </h3>

                <p>
                  <strong>Date:</strong>{" "}
                  {event.event_date || event.date || "N/A"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {event.attendance_status || "Registered"}
                </p>

                {event.registered_at && (
                  <p>
                    <strong>Registered On:</strong>{" "}
                    {new Date(
                      event.registered_at
                    ).toLocaleDateString("en-IN")}
                  </p>
                )}

              </div>

            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default MyEvents;