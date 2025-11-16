// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import navigation
// import "../Pages/HeroSlider.css";

// const images = [
//   "/images/Slider4.jpg",
//   "/images/Slider3.jpg",
//   "/images/Slider5.jpg",
// ];

// function HeroSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate(); // ✅ Hook for navigation

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleExploreClick = () => {
//     navigate("/company"); // ✅ Navigate to Company page
//   };

//   return (
//     <div className="hero-slider">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`slide ${index === currentIndex ? "active" : ""}`}
//           style={{ backgroundImage: `url(${image})` }}
//         />
//       ))}
//       <div className="hero-overlay">
//         <h1>Welcome to Our Website</h1>
//         <p>Your success is our mission.</p>
//         <button className="cta-btn" onClick={handleExploreClick}>
//           Explore Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HeroSlider;





// HeroSlider.jsx
import React, { useState, useEffect } from "react";
import "./HeroSlider.css";

const slides = [
  "Welcome to My Website",
  "Creative UI with Shape Dividers",
  "React Hero Slider Example",
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      <div className="overlay">
        <h1 className="slide-text">{slides[index]}</h1>
      </div>

      {/* Your Shape Divider */}
      <div className="custom-shape-divider-bottom-1763123669">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSlider;
