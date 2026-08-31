import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./ForumDetails.css";

function ForumDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [question, setQuestion] = useState(null);

    const [answers, setAnswers] = useState([]);

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchQuestion();

    }, [id]);

    const fetchQuestion = async () => {

        try {

            const questionRes = await API.get(
                `forum/${id}/`
            );

            setQuestion(questionRes.data);

            const answerRes = await API.get(
                `forum/${id}/`
            );

            if (answerRes.data.answers) {

                setAnswers(answerRes.data.answers);

            }

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleLike = async (answerId) => {

        try {

            await API.post(
                `forum/answer/${answerId}/like/`
            );

            alert("❤️ Answer Liked");

            fetchQuestion();

        }

        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.detail ||
                error.response?.data ||
                "Already Liked"
            );

        }

    };

    const handleAnswerSubmit = async (e) => {

        e.preventDefault();

        if (!answer.trim()) {

            alert("Please write your answer.");

            return;

        }

        try {

            await API.post(
                `forum/${id}/answer/`,
                {
                    answer: answer
                }
            );

            alert("✅ Answer Posted Successfully");

            setAnswer("");

            fetchQuestion();

        }

        catch (error) {

            console.log(error);

            alert("Failed to Post Answer");

        }

    };


    const handleAccept = async (answerId) => {

        try {

            await API.patch(
                `forum/answer/${answerId}/accept/`,
                {
                    is_accepted: true
                }
            );

            alert("✅ Answer Accepted");

            fetchQuestion();

        }

        catch (error) {

            console.log(error);

            alert("Failed to Accept Answer");

        }

    };

    const handleDeleteQuestion = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`forum/${id}/`);

            alert("✅ Question Deleted");

            navigate("/forum");

        }

        catch (error) {

            console.log(error);

            alert("Delete Failed");

        }

    };

    const handleDeleteAnswer = async (answerId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this answer?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `forum/answer/${answerId}/`
            );

            alert("✅ Answer Deleted Successfully");

            fetchQuestion();

        }

        catch (error) {

            console.log(error);

            alert("Failed to Delete Answer");

        }

    };

    if (loading) {

        return (

            <>
                <Sidebar />
                <Topbar />

                <div className="forum-details-container">

                    <h2>Loading...</h2>

                </div>

            </>

        );

    }

    return (

        <>

            <Sidebar />

            <Topbar />

            <div className="forum-details-container">

                <Link
                    to="/forum"
                    className="back-btn"
                >
                    ← Back to Forum
                </Link>

                <div className="question-box">

                    <h1>
                        {question.title}
                    </h1>

                    <div className="question-meta">

                        <span>
                            👤 {question.user_name}
                        </span>

                        <span>
                            📂 {question.category}
                        </span>

                    </div>

                    <p>
                        {question.description}
                    </p>


                    {(currentUser?.id === question.user ||
                    currentUser?.role === "admin") && (

                        <div className="question-actions">

                            <button
                                className="edit-question-btn"
                                onClick={() => navigate(`/forum/${id}/edit`)}
                            >
                                ✏ Edit
                            </button>

                            <button
                                className="delete-question-btn"
                                onClick={handleDeleteQuestion}
                            >
                                🗑 Delete
                            </button>

                        </div>

                    )}

                </div>

                {(currentUser?.role === "student" ||
                currentUser?.role === "alumni") && 
                currentUser?.id !== question.user &&(

                <div className="answer-form">

                    <h2>Write Your Answer</h2>

                    <form onSubmit={handleAnswerSubmit}>

                        <textarea
                            rows="5"
                            placeholder="Write your answer here..."
                            value={answer}
                            onChange={(e) =>
                                setAnswer(e.target.value)
                            }
                        />

                        <button
                            type="submit"
                            className="post-answer-btn"
                        >
                            Post Answer
                        </button>

                    </form>

                </div>

                )}

                <div className="answers-section">

                    <h2>

                        Answers ({answers.length})

                    </h2>

                    {answers.length === 0 ? (

                        <div className="no-answer">

                            No Answers Yet.

                        </div>

                    ) : (

                        answers.map((answer) => (

                            <div
                                className="answer-card"
                                key={answer.id}
                            >

                                <div className="answer-header">

                                    <strong>

                                        👤 {answer.user_name}

                                    </strong>

                                    {answer.is_accepted && (

                                        <span className="accepted">

                                            ✅ Accepted

                                        </span>
                                    )}

                                    {!answer.is_accepted &&
                                    (currentUser?.id === question.user ||
                                    currentUser?.role === "admin") && (

                                        <button
                                            className="accept-btn"
                                            onClick={() => handleAccept(answer.id)}
                                        >
                                            ✅ Accept
                                        </button>

                                    )}

                                </div>

                                <p>

                                    {answer.answer}

                                </p>

                                <div className="answer-actions">

                                    {(currentUser?.role === "student" ||
                                    currentUser?.role === "alumni") && (

                                        <button
                                            className="like-btn"
                                            onClick={() => handleLike(answer.id)}
                                        >
                                            ❤️ Like
                                        </button>

                                    )}

                                    {(currentUser?.id === answer.user ||
                                    currentUser?.role === "admin") && (

                                      <>
                                            <button
                                                className="edit-answer-btn"
                                                onClick={() =>
                                                    navigate(`/forum/answer/${answer.id}/edit`)
                                                }
                                            >
                                                ✏ Edit
                                            </button>

                                            <button
                                                className="delete-answer-btn"
                                                onClick={() => handleDeleteAnswer(answer.id)}
                                            >
                                                🗑 Delete
                                            </button>
                                      </>

                                    )}

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </>

    );

}

export default ForumDetails;