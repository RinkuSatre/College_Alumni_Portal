import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./EventDetails.css";



function EventDetails() {

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const { id } = useParams();

    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const isOwner =
        currentUser?.id === event?.created_by_id;

    const isAdmin =
        currentUser?.role === "admin";

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchEvent();

    }, [id]);

    const fetchEvent = async () => {

        try{

            const response = await API.get(`events/${id}/`);

            setEvent(response.data);

        }

        catch(error){

            console.log("Event Details Error :", error);

        }

        finally{

            setLoading(false);

        }

    };


    const handleRegister = async () => {

        try{

            await API.post(`events/${id}/register/`);

            alert("✅ Registered Successfully");

            fetchEvent();

        }

        catch(error){

            alert(

                error.response?.data?.detail ||

                error.response?.data ||

                "Registration Failed"

            );

        }

    };

    const handleDelete = async () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {

        await API.delete(`events/${id}/`);

        alert("✅ Event Deleted Successfully");

        navigate("/events");

    }

    catch (error) {

        console.log(error);

        alert("Failed to Delete Event");

    }

};


    if(loading){

        return <h2 style={{textAlign:"center"}}>Loading...</h2>;

    }


    if(!event){

        return <h2 style={{textAlign:"center"}}>Event Not Found</h2>;

    }
        return (

        <>

            <Sidebar />

            <Topbar />

            <div className="event-details-container">

                <div className="event-details-card">

                    <img
                        src={
                            event.banner ||
                            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
                        }
                        alt={event.title}
                        className="event-banner"
                    />

                    <div className="event-content">

                        <h2>{event.title}</h2>

                        <div className="event-info">

                            <p><strong>📅 Date :</strong> {event.event_date}</p>

                            <p><strong>🕒 Time :</strong> {event.event_time}</p>

                            <p><strong>📍 Venue :</strong> {event.venue}</p>

                            <p><strong>👥 Capacity :</strong> {event.capacity}</p>

                            <p><strong>📌 Status :</strong> {event.status}</p>

                            <p>
                                <strong>⏳ Registration Deadline :</strong>{" "}
                                {event.registration_deadline}
                            </p>

                            <p>
                                <strong>🎤 Event Type :</strong>{" "}
                                {event.event_type}
                            </p>

                            <p>
                                <strong>👤 Created By :</strong>{" "}
                                {event.created_by_name}
                            </p>

                        </div>

                        <div className="event-description">

                            <h3>Description</h3>

                            <p>{event.description}</p>

                        </div>

                        <div className="event-buttons">

                            {/* Student */}
                            {currentUser?.role === "student" && (

                                <button
                                    className="register-btn"
                                    onClick={handleRegister}
                                >
                                    Register Now
                                </button>

                            )}

                            {/* Event Owner or Admin */}
                            {(isOwner || isAdmin) && (

                                <>
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/events/${id}/edit`)}
                                    >
                                        ✏️ Edit Event
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={handleDelete}
                                    >
                                        🗑 Delete Event
                                    </button>

                                </>

                            )}

                            <button
                                className="back-btn"
                                onClick={() => navigate("/events")}
                            >
                                Back
                            </button>

                            
                        </div>

                        

                    </div>

                </div>

            </div>

        </>

    );

}

export default EventDetails;