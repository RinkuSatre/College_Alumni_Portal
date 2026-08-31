import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./EditJob.css";

function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({

        title: "",

        company_name: "",

        description: "",

        location: "",

        salary: "",

        experience: "",

        job_type: "Full Time",

        last_date: "",

        company_logo: null,

    });

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        try {

            const response = await API.get(`jobs/${id}/`);

            setFormData({

                title: response.data.title,

                company_name: response.data.company_name,

                description: response.data.description,

                location: response.data.location,

                salary: response.data.salary,

                experience: response.data.experience,

                job_type: response.data.job_type,

                last_date: response.data.last_date,

                company_logo: null,

            });

        }

        catch (error) {

            console.log(error);

            alert("Failed to Load Job");

        }

        finally {

            setLoading(false);

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

            company_logo: e.target.files[0],

        });

    };

    if (loading) {

        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

    }

        const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {

            if (formData[key] !== null) {

                data.append(key, formData[key]);

            }

        });

        try {

            await API.put(`jobs/${id}/`, data, {

                headers: {

                    "Content-Type": "multipart/form-data",

                },

            });

            alert("✅ Job Updated Successfully");

            navigate(`/jobs/${id}`);

        }

        catch (error) {

            console.log(error);

            alert("Failed to Update Job");

        }

    };

    return (

        <>

            <Sidebar />

            <Topbar />

            <div className="edit-job-container">

                <div className="edit-job-card">

                    <h2>Edit Job</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="title"
                            placeholder="Job Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="company_name"
                            placeholder="Company Name"
                            value={formData.company_name}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Job Description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <div className="form-row">

                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="salary"
                                placeholder="Salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-row">

                            <input
                                type="number"
                                name="experience"
                                placeholder="Experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="date"
                                name="last_date"
                                value={formData.last_date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <select
                            name="job_type"
                            value={formData.job_type}
                            onChange={handleChange}
                        >

                            <option>Full Time</option>
                            <option>Part Time</option>
                            <option>Internship</option>
                            <option>Remote</option>

                        </select>


                        <div className="edit-buttons">

                            <button
                                type="submit"
                                className="update-btn"
                            >
                                Update Job
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate(`/jobs/${id}`)}
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

export default EditJob;