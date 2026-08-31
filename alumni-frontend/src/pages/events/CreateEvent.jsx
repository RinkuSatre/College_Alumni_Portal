import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./CreateEvent.css";

function CreateEvent() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        event_type: "Alumni Meet",

        event_date: "",

        event_time: "",

        venue: "",

        capacity: "",

        registration_deadline: "",

        status: "Upcoming",

        banner: null,

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value,

        });

    };

    const handleFileChange = (e) => {

        setFormData({

            ...formData,

            banner: e.target.files[0],

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {

            data.append(key, formData[key]);

        });

        try {

            await API.post("events/", data, {

                headers: {

                    "Content-Type": "multipart/form-data",

                },

            });

            alert("✅ Event Created Successfully");

            navigate("/events");

        }

        catch (error) {

            console.log(error);

            alert("Failed to Create Event");

        }

    };
        return (

        <>

            <Sidebar />

            <Topbar />

            <div className="create-event-container">

                <div className="create-event-card">

                    <h2>Create New Event</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="title"
                            placeholder="Event Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Event Description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="event_type"
                            value={formData.event_type}
                            onChange={handleChange}
                        >
                            <option>Alumni Meet</option>
                            <option>Workshop</option>
                            <option>Seminar</option>
                            <option>Webinar</option>
                            <option>Placement Drive</option>
                            <option>Cultural Event</option>
                            <option>Other</option>
                        </select>

                        <div className="form-row">

                            <input
                                type="date"
                                name="event_date"
                                value={formData.event_date}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="time"
                                name="event_time"
                                value={formData.event_time}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <input
                            type="text"
                            name="venue"
                            placeholder="Venue"
                            value={formData.venue}
                            onChange={handleChange}
                            required
                        />

                        <div className="form-row">

                            <input
                                type="number"
                                name="capacity"
                                placeholder="Capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="date"
                                name="registration_deadline"
                                value={formData.registration_deadline}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option>Upcoming</option>
                            <option>Ongoing</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <div className="create-buttons">

                            <button
                                type="submit"
                                className="create-btn"
                            >
                                Create Event
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/events")}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </>

    );

}

export default CreateEvent;