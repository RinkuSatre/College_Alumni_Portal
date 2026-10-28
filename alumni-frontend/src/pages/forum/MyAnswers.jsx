
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";

import "./MyAnswers.css";

function MyAnswers() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = async () => {
    try {
      const response = await API.get("forum/my-answers/");

      setAnswers(
        response.data.results || response.data
      );
    } catch (error) {
      console.log("My Answers Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="my-answers-container">
        <div className="my-answers-header">
          <div>
            <h2>💬 My Answers</h2>
            <p>Answers you have posted in the forum</p>
          </div>

          <button
            className="back-btn"
            onClick={() => navigate("/alumni/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        {loading ? (
          <p>Loading answers...</p>
        ) : answers.length === 0 ? (
          <div className="no-answers">
            <h3>📭 No Answers Found</h3>
            <p>You have not posted any answers yet.</p>

            <button onClick={() => navigate("/forum")}>
              Explore Forum
            </button>
          </div>
        ) : (
          <>
            <h3 className="answers-count">
              Answers ({answers.length})
            </h3>

            <div className="answers-grid">
              {answers.map((answer) => (
                <div
                  className="answer-card"
                  key={answer.id}
                >
                  <h3>
                    ❓ {answer.question_title ||
                      answer.question_details?.title ||
                      `Question #${answer.question}`}
                  </h3>

                  <p className="answer-text">
                    <strong>💬 Your Answer:</strong>
                    <br />
                    {answer.answer}
                  </p>

                  {answer.created_at && (
                    <small>
                      📅{" "}
                      {new Date(
                        answer.created_at
                      ).toLocaleDateString("en-IN")}
                    </small>
                  )}

                  {answer.is_accepted && (
                    <p className="accepted-answer">
                      ✅ Accepted Answer
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyAnswers;
