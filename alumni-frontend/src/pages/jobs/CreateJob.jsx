import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./CreateJob.css";

function CreateJob() {

    const navigate = useNavigate();

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

        const handleSubmit = async (e) => {

        e.preventDefault();

        const data = new FormData();

        Object.keys(formData).forEach((key) => {

            if (formData[key] !== null) {

                data.append(key, formData[key]);

            }

        });

        try {

            await API.post("jobs/", data, {

                headers: {

                    "Content-Type": "multipart/form-data",

                },

            });

            alert("✅ Job Created Successfully");

            navigate("/jobs");

        }

        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Failed to Create Job"
            );

        }

    };

    return (

        <>

            <Sidebar />

            <Topbar />

            <div className="create-job-container">

                <div className="create-job-card">

                    <h2>Create New Job</h2>

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
                                placeholder="Experience (Years)"
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


                        <div className="create-buttons">

                            <button
                                type="submit"
                                className="create-btn"
                            >
                                Create Job
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/jobs")}
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

export default CreateJob;