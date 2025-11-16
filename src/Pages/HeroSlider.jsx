import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation
import "../Pages/HeroSlider.css";

const images = [
  "/images/Slider4.jpg",
  "/images/Slider3.jpg",
  "/images/Slider5.jpg",
];

function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // ✅ Hook for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    navigate("/company"); // ✅ Navigate to Company page
  };

  return (
    <div className="hero-slider">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="hero-overlay">
        <h1>Welcome to Our Website</h1>
        <p>Your success is our mission.</p>
        <button className="cta-btn" onClick={handleExploreClick}>
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default HeroSlider;
