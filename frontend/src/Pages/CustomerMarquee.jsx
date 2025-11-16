// CustomerMarquee.jsx
import React from "react";
import "./CustomerMarquee.css"; // styles

const logos = [
  "/images/customerlogo/Kohler.png",
  "/images/customerlogo/LT.png",
  "/images/customerlogo/Mahindra.png",
  "/images/customerlogo/Bajaj.png",
  "/images/customerlogo/Bharat.png",
  "/images/customerlogo/Kems.png",
  "/images/customerlogo/Jaguar.png",
  "/images/customerlogo/Memco.png",
  "/images/customerlogo/Lgb.png",
  "/images/customerlogo/RSB.png",
  "/images/customerlogo/Amul.png",
  "/images/customerlogo/Polyhose.png",
  "/images/customerlogo/Uniflex.png",
  "/images/customerlogo/GD.png",
  "/images/customerlogo/DMW.png",
  "/images/customerlogo/Rollon.png",
  "/images/customerlogo/Cooper.png",
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
