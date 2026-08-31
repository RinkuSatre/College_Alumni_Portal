import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "./UpcomingEvents.css";

function UpcomingEvents() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {

      const response = await API.get("events/");

      const data = response.data.results || response.data;

      const upcoming = data
        .filter(event => event.status === "Upcoming")
        .slice(0, 3);

      setEvents(upcoming);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <section className="upcoming-events" id="events">

      <h2>Upcoming Events</h2>

      <p className="upcoming-subtitle">
        Stay connected with our latest college events.
      </p>

      <div className="upcoming-grid">

        {events.map((event) => (

          <div
            className="upcoming-card"
            key={event.id}
          >

            <img
              src={
                event.banner ||
                "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900"
              }
              alt={event.title}
            />

            <div className="upcoming-body">

              <h3>{event.title}</h3>

              <p>📅 {event.event_date}</p>

              <p>📍 {event.venue}</p>

              <p>🕒 {event.event_time}</p>

              <Link
                to={`/events/${event.id}`}
                className="upcoming-btn"
              >
                View Details
              </Link>

            </div>

          </div>

        ))}

      </div>

      <div className="view-all-events">

        <Link to="/events">
          View All Events
        </Link>

      </div>

    </section>

  );

}

export default UpcomingEvents;