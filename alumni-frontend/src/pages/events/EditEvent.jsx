import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./CreateEvent.css";

function EditEvent() {

    const { id } = useParams();

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

    useEffect(() => {

        fetchEvent();

    }, []);

    const fetchEvent = async () => {

        try{

            const response = await API.get(`events/${id}/`);

            setFormData({

                ...response.data,

                banner:null,

            });

        }

        catch(error){

            console.log(error);

        }

    };

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

            banner:e.target.files[0],

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key)=>{

            if(formData[key] !== null){

                data.append(key,formData[key]);

            }

        });

        try{

            await API.put(

                `events/${id}/`,

                data,

                {

                    headers:{

                        "Content-Type":"multipart/form-data",

                    }

                }

            );

            alert("✅ Event Updated Successfully");

            navigate(`/events/${id}`);

        }

        catch(error){

            console.log(error);

            alert("Failed to Update Event");

        }

    };
        return (

        <>

            <Sidebar />

            <Topbar />

            <div className="create-event-container">

                <div className="create-event-card">

                    <h2>Edit Event</h2>

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
                            <option value="Alumni Meet">Alumni Meet</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Webinar">Webinar</option>
                            <option value="Placement Drive">Placement Drive</option>
                            <option value="Cultural Event">Cultural Event</option>
                            <option value="Other">Other</option>
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
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
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
                                Update Event
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate(`/events/${id}`)}
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

export default EditEvent;