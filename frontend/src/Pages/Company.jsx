import React, { useEffect } from "react";
import "./Company.css";
import { Factory, Users, CheckCircle, ChevronUp } from "lucide-react";

function Company() {
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("backToTop");
      if (window.scrollY > 300) btn.classList.add("show-back-to-top");
      else btn.classList.remove("show-back-to-top");
    };

    const fadeElements = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    fadeElements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div id="company-section" style={{ paddingTop: "100px" }}>

      {/* ================= HERO SECTION (FULL WIDTH) ================= */}
      <section className="hero-section mb-5" style={{ margin: 0, width: "100%" }}>
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="./Video/Vid1.mp4" type="video/mp4" />
        </video>

        <div className="hero-content animate-fade-in">
          <h1>Real Technologies Machines Pvt. Ltd.</h1>
          <p>
            Since <b>2006</b>, we have been a trusted{" "}
            <span className="fw-semibold">Manufacturer</span> of{" "}
            <b>Cleaning Machines, Filtration Systems, and Magnetic Separators</b>,
            delivering{" "}
            <span className="fw-bold text-primary">
              innovative & reliable solutions
            </span>{" "}
            to industries worldwide.
          </p>
        </div>
      </section>

      {/* ================= CONTENT INSIDE CONTAINER ================= */}
      <div className="container">

        {/* PRODUCT CATEGORIES */}
        <section className="mb-5 fade-in-section">
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
                <a href={item.link} className="text-decoration-none">
                  <div className="card h-100 shadow-sm border-0 hover-card">
                    <img src={item.img} alt={item.title} className="card-img-top" />
                    <div className="card-body text-center">
                      <h5 className="card-title text-dark fw-semibold">{item.title}</h5>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT SECTIONS */}
        {[
          {
            id: "ultrasonic",
            title: "Ultrasonic Cleaning Machines",
            desc: "Advanced Fully Automatic Conveyorized Multistage Ultrasonic & High Pressure Jet Cleaning Machine With Highest Cleaning Quality",
            imgs: [9, 10, 11],
            features: [
              "Single stage ultrasonic cleaning machine",
              "Conveyorized ultrasonic cleaning machine",
              "Multi-stage ultrasonic cleaning machine",
              "Single chamber multi-operations cleaning machine",
            ],
            highlights: [
              "Multistage ultrasonic cleaning & high pressure jet (10–15 bar) with basket rotation",
              "100% drying of components after cleaning",
              "RPA oiling application with dipping or spray jet",
              "Cycle time: 1–2 minutes",
              "Millipore value achievement below 2 mg",
              "Particle size - 50 micron, - 100 micron",
              "High production rate with every 1–2 minutes",
              "Existing manual machines can be upgraded to fully automatic",
            ],
          },
          {
            id: "bintray",
            title: "Bin / Tray Cleaning Machines",
            desc: "Advanced cleaning technology for bins and trays with long-term efficiency and environmental benefits.",
            imgs: [12, 13, 14],
            features: [
              "Conveyorized Two/Three stage degreasing or Rising & Air Blow cleaning",
              "High pressure jet continuous conveyor or indexing type",
              "Drying at air blow chamber zone",
              "PLC controlled electrical panel with advanced material handling",
              "Paper band filtration system for oil, grease, dirt & metal particles",
              "Rotary basket type with dedicated nozzle orientation",
              "Disk or belt type oil skimmer for oil removal",
            ],
          },
        ].map((section, idx) => (
          <section id={section.id} key={idx} className="mb-5 fade-in-section">
            <h2 className="section-title">{section.title}</h2>
            <p className="text-center text-muted mb-4">{section.desc}</p>
            <div className="row g-4">
              {section.imgs.map((n, i) => (
                <div className="col-md-4" key={i}>
                  <img
                    src={`https://picsum.photos/400/250?random=${n}`}
                    alt={section.title}
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
              ))}
            </div>
            {section.features && (
              <ul className="features-list mt-4">
                {section.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
            {section.highlights && (
              <>
                <h4 className="fw-semibold mt-3">Silent Features</h4>
                <ul className="features-list mt-4">
                  {section.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        ))}

        {/* FACTSHEET */}
        <section className="mb-5 fade-in-section">
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
      </div>

      {/* BACK TO TOP */}
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
