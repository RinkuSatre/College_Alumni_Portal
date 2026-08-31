import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./CreateQuestion.css";

function EditAnswer() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [answer, setAnswer] = useState("");

    useEffect(() => {

        fetchAnswer();

    }, []);

    const fetchAnswer = async () => {

        try {

            const response = await API.get(
                `forum/answer/${id}/`
            );

            setAnswer(
                response.data.answer
            );

        }

        catch (error) {

            console.log(error);

            alert("Failed to Load Answer");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(

                `forum/answer/${id}/`,

                {
                    answer: answer
                }

            );

            alert("✅ Answer Updated Successfully");

            navigate(-1);

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

                    <h2>Edit Answer</h2>

                    <form onSubmit={handleSubmit}>

                        <textarea

                            rows="8"

                            value={answer}

                            onChange={(e) =>
                                setAnswer(e.target.value)
                            }

                            required

                        />

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Update Answer
                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default EditAnswer;