import { useState } from "react";
import "./Feedback.css";

function Feedback() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
    rating: "5",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Feedback Submitted Successfully!");

    setFormData({
      name: "",
      email: "",
      role: "Student",
      rating: "5",
      message: "",
    });
  };

  return (

    <section id="feedback" className="feedback">

      <h2>Share Your Feedback</h2>

      <p>We value your suggestions and opinions.</p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option>Student</option>
          <option>Alumni</option>
          <option>Visitor</option>
        </select>

        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
          <option value="4">⭐⭐⭐⭐ Good</option>
          <option value="3">⭐⭐⭐ Average</option>
          <option value="2">⭐⭐ Poor</option>
          <option value="1">⭐ Bad</option>
        </select>

        <textarea
          rows="5"
          name="message"
          placeholder="Write your feedback..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Submit Feedback
        </button>

      </form>

    </section>

  );

}

export default Feedback;