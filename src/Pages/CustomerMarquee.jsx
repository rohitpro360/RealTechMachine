// CustomerMarquee.jsx
import React from "react";
import "./CustomerMarquee.css"; // styles

const logos = [
  "/images/logo1.png",
  "/images/logo2.png",
  "/images/logo3.png",
  "/images/logo4.png",
  "/images/logo5.png",
  "/images/logo6.png",
];

const CustomerMarquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee">
        {logos.concat(logos).map((logo, index) => (
          <div className="logo-box" key={index}>
            <img src={logo} alt={`Customer ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerMarquee;
