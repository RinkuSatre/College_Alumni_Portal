import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./CreateQuestion.css";

function EditQuestion() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("Programming");

    useEffect(() => {

        fetchQuestion();

    }, []);

    const fetchQuestion = async () => {

        try {

            const res = await API.get(`forum/${id}/`);

            setTitle(res.data.title);

            setDescription(res.data.description);

            setCategory(res.data.category);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(`forum/${id}/`, {

                title,
                description,
                category

            });

            alert("✅ Question Updated Successfully");

            navigate(`/forum/${id}`);

        }

        catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <>
            <Sidebar />

            <Topbar />

            <div className="create-question-container">

                <div className="create-question-card">

                    <h2>Edit Question</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />

                        <textarea
                            rows="6"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            required
                        />

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >
                            <option>Programming</option>
                            <option>Career</option>
                            <option>Placement</option>
                            <option>Higher Studies</option>
                            <option>General</option>
                        </select>

                        <button  type="submit" className="update-question-btn">

                            Update Question

                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default EditQuestion;