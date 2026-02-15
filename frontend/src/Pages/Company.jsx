import React from "react";
import "./Company.css";
import RealCol from "./Realcol";

import { Factory, Users, CheckCircle, Settings, Package, ChevronUp } from "lucide-react";


function Company() {
  React.useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("backToTop");
      if (window.scrollY > 300) {
        btn.classList.add("show-back-to-top");
      } else {
        btn.classList.remove("show-back-to-top");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container py-5 mt-5 pt-5"  id="company-section"style={{ paddingTop: "100px" }}>
      {/* Header / About Section */}
      {/* Hero Section with Video Background */}
      <section className="hero-section mb-5">
        <video autoPlay muted loop playsInline className="hero-video">
          <source
            src="./Video/Vid1.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="hero-content">
          <h1>Real Technologies Machines Pvt. Ltd.</h1>
          <p>
            Since <b>2006</b>, we have been a trusted{" "}
            <span className="fw-semibold">Manufacturer</span> of{" "}
            <b>Cleaning Machines, Filtration Systems, and Magnetic Separators</b>,
            delivering{" "}
            <span className="fw-bold text-primary">innovative & reliable solutions</span>{" "}
            to industries worldwide.
          </p>
        </div>
      </section>
    <section>
      <RealCol />
    </section>
      {/* Product Categories */}
      <section className="mb-5">
        <h2 className="section-title">Our Product Categories</h2>
        <div className="row g-4">
          {[
            { title: "Cleaning Machines", img: "https://picsum.photos/400/250?random=1", link: "#cleaning" },
            { title: "Ultrasonic Cleaning Machines", img: "https://picsum.photos/400/250?random=2", link: "#ultrasonic" },
            { title: "Bin / Tray Cleaning Machines", img: "https://picsum.photos/400/250?random=3", link: "#bintray" },
            { title: "Industrial Component Cleaners", img: "https://picsum.photos/400/250?random=4", link: "#industrial" },
            { title: "Coolant Filtration Systems", img: "https://picsum.photos/400/250?random=5", link: "#coolant" },
            { title: "Special Purpose Cleaning Machines", img: "https://picsum.photos/400/250?random=6", link: "#spm" },
            { title: "Crankshaft & Cylinder Head Cleaning", img: "https://picsum.photos/400/250?random=7", link: "#crankshaft" },
            { title: "Painting Systems", img: "https://picsum.photos/400/250?random=8", link: "#painting" },
          ].map((item, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <a
                href={item.link}
                className="text-decoration-none"
              >
                <div className="card h-100 shadow-sm border-0 hover-card">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-dark fw-semibold">
                      {item.title}
                    </h5>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>


      {/* Ultrasonic Cleaning Machines */}
      <section id="ultrasonic" className="mb-5">
        <h2 className="section-title">Ultrasonic Cleaning Machines</h2>
        <p className="text-center text-muted mb-4">
          Advanced Fully Automatic Conveyorized Multistage Ultrasonic & High
          Pressure Jet Cleaning Machine With Highest Cleaning Quality
        </p>
        <div className="row g-4">
          {[
            "https://picsum.photos/400/250?random=9",
            "https://picsum.photos/400/250?random=10",
            "https://picsum.photos/400/250?random=11",
          ].map((img, i) => (
            <div className="col-md-4" key={i}>
              <img src={img} alt="Ultrasonic" className="img-fluid rounded shadow-sm" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h4 className="fw-semibold">Product Range</h4>
          <ul className="features-list mt-4">
            <li>Single stage ultrasonic cleaning machine</li>
            <li>Conveyorized ultrasonic cleaning machine</li>
            <li>Multi-stage ultrasonic cleaning machine</li>
            <li>Single chamber multi-operations cleaning machine</li>
          </ul>
          <h4 className="fw-semibold mt-3">Silent Features</h4>
          <ul className="features-list mt-4">
            <li>Multistage ultrasonic cleaning & high pressure jet (10–15 bar) with basket rotation</li>
            <li>100% drying of components after cleaning</li>
            <li>RPA oiling application with dipping or spray jet</li>
            <li>Cycle time: 1–2 minutes</li>
            <li>Millipore value achievement below 2 mg</li>
            <li>Particle size - 50 micron, - 100 micron</li>
            <li>High production rate with every 1–2 minutes</li>
            <li>Existing manual machines can be upgraded to fully automatic</li>
          </ul>
        </div>
      </section>

      {/* Bin / Tray Cleaning Machines */}
      <section id="bintray" className="mb-5">
        <h2 className="section-title">Bin / Tray Cleaning Machines</h2>
        <p className="text-center text-muted mb-4">
          Advanced cleaning technology for bins and trays with long-term
          efficiency and environmental benefits.
        </p>
        <div className="row g-4">
          {[
            "https://picsum.photos/400/250?random=12",
            "https://picsum.photos/400/250?random=13",
            "https://picsum.photos/400/250?random=14",
          ].map((img, i) => (
            <div className="col-md-4" key={i}>
              <img src={img} alt="Bin Tray" className="img-fluid rounded shadow-sm" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h4 className="fw-semibold">Key Features</h4>
          <ul className="features-list mt-4">
            <li>Conveyorized Two/Three stage degreasing or Rising & Air Blow cleaning</li>
            <li>High pressure jet continuous conveyor or indexing type</li>
            <li>Drying at air blow chamber zone</li>
            <li>PLC controlled electrical panel with advanced material handling</li>
            <li>Paper band filtration system for oil, grease, dirt & metal particles</li>
            <li>Rotary basket type with dedicated nozzle orientation</li>
            <li>Disk or belt type oil skimmer for oil removal</li>
          </ul>
        </div>
      </section>

      {/* Special Purpose Cleaning Machines */}
      <section id="spm" className="mb-5">
        <h2 className="section-title">Special Purpose Cleaning Machines (SPMs)</h2>
        <p className="text-center text-muted mb-4">
          Customized cleaning machines designed to meet critical cleaning
          requirements and deliver high production rates.
        </p>
        <div className="row g-4">
          {[
            "https://picsum.photos/400/250?random=15",
            "https://picsum.photos/400/250?random=16",
          ].map((img, i) => (
            <div className="col-md-6" key={i}>
              <img
                src={img}
                alt={`SPM ${i + 1}`}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))}
        </div>
        <ul className="features-list mt-4">
          <li>Designed for complex components</li>
          <li>Tailored to customer-specific cleaning requirements</li>
          <li>Supports integration with automation & robotics</li>
          <li>Ensures repeatable and reliable cleaning cycles</li>
        </ul>
      </section>

      {/* Cylinder Head Cleaning Machines */}
      <section id="cylinder-head" className="mb-5">
        <h2 className="section-title">Conveyorized Cylinder Head Cleaning Machines</h2>
        <p className="text-center text-muted mb-4">
          Advanced high-pressure jet cleaning integrated with ultrasonic cleaning
          and automated handling for maximum precision.
        </p>
        <div className="row g-4">
          {[
            "https://picsum.photos/400/250?random=17",
            "https://picsum.photos/400/250?random=18",
          ].map((img, i) => (
            <div className="col-md-6" key={i}>
              <img
                src={img}
                alt={`Cylinder Head ${i + 1}`}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))}
        </div>
        <ul className="features-list mt-4">
          <li>High pressure jet cleaning with ultrasonic technology</li>
          <li>Cross transfer material handling system</li>
          <li>PLC controlled operations with automated drying</li>
          <li>Cycle time optimized for mass production</li>
        </ul>
      </section>

      {/* Crankshaft Cleaning Machines */}
      <section id="crankshaft" className="mb-5">
        <h2 className="section-title">Cabinet Type Crankshaft Cleaning Machines</h2>
        <p className="text-center text-muted mb-4">
          Reliable high-pressure cleaning of crankshafts with rotation and
          oscillation inside chamber for superior results.
        </p>
        <div className="row g-4">
          {[
            "https://picsum.photos/400/250?random=19",
            "https://picsum.photos/400/250?random=20",
          ].map((img, i) => (
            <div className="col-md-6" key={i}>
              <img
                src={img}
                alt={`Crankshaft ${i + 1}`}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))}
        </div>
        <ul className="features-list mt-4">
          <li>Basket rotation and oscillation for effective cleaning</li>
          <li>Dedicated nozzle orientation for deep cleaning</li>
          <li>Adaptable to different crankshaft sizes</li>
          <li>Durable and low-maintenance design</li>
        </ul>
      </section>


      {/* Factsheet */}
      <section className="mb-5">
        <h2 className="section-title">Company Factsheet</h2>
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 fact-card">
              <Factory className="text-primary mb-3" size={42} />
              <h5 className="fw-semibold">Year of Establishment</h5>
              <p className="text-muted">2006</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 fact-card">
              <Users className="text-primary mb-3" size={42} />
              <h5 className="fw-semibold">Total Employees</h5>
              <p className="text-muted">Up to 10 People</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4 shadow-sm border-0 fact-card">
              <CheckCircle className="text-primary mb-3" size={42} />
              <h5 className="fw-semibold">Nature of Business</h5>
              <p className="text-muted">Manufacturer</p>
            </div>
          </div>
        </div>
      </section>
      {/* Back to Top Button */}
      <button
        id="backToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top"
      >
        <ChevronUp size={24} />
      </button>

    </div>

  );


}

export default Company;
