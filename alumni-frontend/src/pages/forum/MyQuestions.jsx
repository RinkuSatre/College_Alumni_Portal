import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";

import "./MyQuestions.css";

function MyQuestions() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await API.get("forum/my-questions/");

      setQuestions(
        response.data.results || response.data
      );
    } catch (error) {
      console.log("My Questions Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="my-questions-container">

        <div className="my-questions-header">

          <div>
            <h2>💬 My Questions</h2>
            <p>
              Questions you have posted in the forum
            </p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/student/dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>

        {loading ? (
          <p className="loading-text">
            Loading questions...
          </p>
        ) : questions.length === 0 ? (

          <div className="no-questions">

            <h3>📭 No Questions Found</h3>

            <p>
              You have not posted any questions yet.
            </p>

            <button
              onClick={() => navigate("/forum/create")}
            >
              Ask a Question
            </button>

          </div>

        ) : (

          <div className="questions-grid">

            {questions.map((question) => (

              <div
                className="question-card"
                key={question.id}
                onClick={() =>
                  navigate(`/forum/${question.id}`)
                }
              >

                <h3>
                  💬 {question.title}
                </h3>

                {question.created_at && (
                  <p>
                    <strong>Asked On:</strong>{" "}
                    {new Date(
                      question.created_at
                    ).toLocaleDateString("en-IN")}
                  </p>
                )}

                <span className="view-question">
                  View Question →
                </span>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default MyQuestions;