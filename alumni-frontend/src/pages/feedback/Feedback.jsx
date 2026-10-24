import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./Feedback.css";

const initialForm = {
  category: "website",
  rating: 0,
  message: "",
};

function Feedback() {
  const [form, setForm] = useState(initialForm);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await API.get("feedback/");
      const data = response.data;

      setFeedbacks(
        Array.isArray(data) ? data : data.results || []
      );
      setError("");
    } catch (err) {
      console.error("Feedback GET error:", err.response?.data || err);
      setError("Unable to load your feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRating = (rating) => {
    setForm((previous) => ({
      ...previous,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.rating < 1 || form.rating > 5) {
      setError("Please select a rating from 1 to 5 stars.");
      return;
    }

    if (!form.message.trim()) {
      setError("Please enter your feedback message.");
      return;
    }

    try {
      setSubmitting(true);

      await API.post("feedback/", {
        category: form.category,
        rating: form.rating,
        message: form.message.trim(),
      });

      setForm(initialForm);
      setSuccess("Thank you! Your feedback was submitted successfully.");
      await fetchFeedbacks();
    } catch (err) {
      console.error("Feedback POST error:", err.response?.data || err);
      setError(
        err.response?.data?.detail ||
        "Feedback submission failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (value) =>
    new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <>
      <Sidebar />
      <Topbar />

      <main className="feedback-page">
        <section className="feedback-hero">
          <span className="feedback-eyebrow">YTC ALUMNI PORTAL</span>
          <h1>We Value Your Feedback</h1>
          <p>
            Share your experience and suggestions to help us improve
            the portal for everyone.
          </p>
        </section>

        <div className="feedback-layout">
          <section className="feedback-card">
            <h2>Share Your Feedback</h2>
            <p className="feedback-subtitle">
              Tell us what is working well and what we can improve.
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="feedback-category">Category</label>

              <select
                id="feedback-category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="website">Website</option>
                <option value="jobs">Jobs</option>
                <option value="events">Events</option>
                <option value="technical">Technical Issue</option>
                <option value="suggestion">Suggestion</option>
                <option value="other">Other</option>
              </select>

              <label>Rate Your Experience</label>

              <div
                className="feedback-stars"
                role="group"
                aria-label="Rate your experience from 1 to 5 stars"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={star <= form.rating ? "star active" : "star"}
                    onClick={() => handleRating(star)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    aria-pressed={form.rating === star}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p className="rating-caption">
                {form.rating === 0
                  ? "Select a rating"
                  : `${form.rating} out of 5 stars`}
              </p>

              <label htmlFor="feedback-message">Your Message</label>

              <textarea
                id="feedback-message"
                name="message"
                placeholder="Write your feedback or suggestion here..."
                value={form.message}
                onChange={handleChange}
                maxLength={2000}
                rows={5}
                required
              />

              <div className="feedback-char-count">
                {form.message.length}/2000 characters
              </div>

              {error && <p className="feedback-error">{error}</p>}
              {success && <p className="feedback-success">{success}</p>}

              <button
                className="feedback-submit-btn"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </section>

          <section className="feedback-history">
            <div className="feedback-history-heading">
              <div>
                <h2>My Feedback</h2>
                <p>Review your previous submissions.</p>
              </div>

              <span className="feedback-total">{feedbacks.length}</span>
            </div>

            {loading ? (
              <p className="feedback-empty">Loading feedback...</p>
            ) : feedbacks.length === 0 ? (
              <div className="feedback-empty">
                <span>💬</span>
                <h3>No feedback yet</h3>
                <p>Your submitted feedback will appear here.</p>
              </div>
            ) : (
              <div className="feedback-history-list">
                {feedbacks.map((item) => (
                  <article className="feedback-history-item" key={item.id}>
                    <div className="feedback-item-top">
                      <span className="feedback-category">
                        {item.category.replace("_", " ")}
                      </span>

                      <span
                        className={`feedback-status status-${item.status}`}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="feedback-item-stars">
                      {"★".repeat(item.rating)}
                      <span>{"★".repeat(5 - item.rating)}</span>
                    </div>

                    <p>{item.message}</p>

                    <small>{formatDate(item.created_at)}</small>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default Feedback;