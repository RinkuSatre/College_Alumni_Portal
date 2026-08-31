import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./Events.css";

function Events() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    try {

      const response = await API.get("events/");

      setEvents(response.data.results || response.data);

    }

    catch(error){

      console.log("Events Error :",error);

    }

  };

  const filteredEvents = events.filter((event)=>

      event.title
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return(

    <>

      <Sidebar/>

      <Topbar/>

      <div className="events-content">

        <div className="events-header">

          <h2>📅 College Events</h2>

          <input

            type="text"

            placeholder="Search Events..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

          />

          {(user?.role === "alumni" || user?.role === "admin") && (

            <button
              className="create-event-btn"
              onClick={() => navigate("/events/create")}
            >
              ➕ Create Event
            </button>

          )}

        </div>

        <div className="events-grid">

          {

            filteredEvents.map((event)=>(

              <div
                className="event-card"
                key={event.id}
              >

                <img

                  src={
                    event.banner ||
                   "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900"
                  }

                  alt={event.title}

                />

                <div className="event-body">

                  <h3>{event.title}</h3>

                  <p>

                    📅 {event.event_date}

                  </p>

                  <p>

                   🕒 {event.event_time}

                  </p>

                  <p>

                    📍 {event.venue}

                  </p>

                  <p>

                    👥 Capacity : {event.capacity}

                  </p>

                   <p>

                    📌 {event.status}

                  </p>

                  <p>

                    {

                      event.description?.slice(0,100)

                    }...

                  </p>

                                    <div className="event-buttons">

                    <Link
                      to={`/events/${event.id}`}
                      className="details-btn"
                    >
                      View Details
                    </Link>

                    <button
                      className="register-btn"
                      onClick={async () => {

                        try {

                          await API.post(
                            `events/${event.id}/register/`
                          );

                          alert(
                            "✅ Event Registered Successfully"
                          );

                        } catch (error) {

                          alert(
                            error.response?.data?.detail ||
                            "Already Registered"
                          );

                        }

                      }}
                    >
                      Register
                    </button>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </>

  );

}

export default Events;