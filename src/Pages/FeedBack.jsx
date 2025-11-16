import React, { useState } from "react";
import "./FeedBack.css";

function FeedBack() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0, // ⭐ new field
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ⭐ Handle rating click
  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "", rating: 0 });
  };

  return (
    <div
      className="feedback-container"
      style={{ paddingTop: "90px", paddingBottom: "40px" }}
    >
      <h2 className="feedback-title">We Value Your Feedback</h2>
      <p className="feedback-subtitle">
        Share your thoughts, suggestions, or issues. We’ll use your feedback to
        improve.
      </p>

      {submitted ? (
        <div className="feedback-success">✅ Thank you for your feedback!</div>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* ⭐ Rating Section */}
          <div className="rating-container">
            <label className="rating-label">Rate Us:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? "filled" : ""}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <textarea
            name="message"
            placeholder="Write your feedback..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="feedback-btn">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}

export default FeedBack;
