import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./Forum.css";

function Forum() {

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [questions, setQuestions] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchQuestions();

    }, []);

    const fetchQuestions = async () => {

        try {

            const response = await API.get("forum/");

            setQuestions(
                response.data.results || response.data
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const filteredQuestions = questions.filter(

        (question) =>

            question.title
                .toLowerCase()
                .includes(search.toLowerCase())

    );

        return (

        <>

            <Sidebar />

            <Topbar />

            <div className="forum-container">

                <div className="forum-header">

                    <h2>💬 Discussion Forum</h2>

                    {(currentUser?.role === "student" ||
                        currentUser?.role === "alumni" ||
                        currentUser?.role === "admin") && (

                        <Link
                            to="/forum/create"
                            className="ask-btn"
                        >
                            + Ask Question
                        </Link>

                    )}

                </div>

                <input
                    type="text"
                    className="search-box"
                    placeholder="Search Questions..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                {filteredQuestions.length === 0 ? (

                    <div className="no-question">

                        <h3>No Questions Found</h3>

                    </div>

                ) : (

                    <div className="question-grid">

                        {filteredQuestions.map((question) => (

                            <div
                                className="question-card"
                                key={question.id}
                            >

                                <h3>

                                    {question.title}

                                </h3>

                                <p className="question-description">
                                    {question.description}
                                </p>
    

                                <div className="question-info">

                                    <span>
                                        👤 {question.user_name}
                                    </span>

                                    <span>
                                        📂 {question.category}
                                    </span>

                                </div>

                                <Link
                                    to={`/forum/${question.id}`}
                                    className="details-btn"
                                >
                                    View Details
                                </Link>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </>

    );

}

export default Forum;