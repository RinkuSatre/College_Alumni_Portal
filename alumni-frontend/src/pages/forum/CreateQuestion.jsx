import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./CreateQuestion.css";

function CreateQuestion() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        category: "General",

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "forum/",
                formData
            );

            alert("✅ Question Posted Successfully");

            navigate("/forum");

        }

        catch (error) {

            console.log(error);

            alert("Failed to Post Question");

        }

    };

        return (

        <>

            <Sidebar />

            <Topbar />

            <div className="create-question-container">

                <div className="create-question-card">

                    <h2>Ask a New Question</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="title"
                            placeholder="Question Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Describe your question..."
                            rows="6"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="General">General</option>
                            <option value="Programming">Programming</option>
                            <option value="Career">Career</option>
                            <option value="Placement">Placement</option>
                            <option value="Higher Studies">Higher Studies</option>
                        </select>

                        <div className="question-buttons">

                            <button
                                type="submit"
                                className="create-btn"
                            >
                                Post Question
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/forum")}
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

export default CreateQuestion;