import React from "react";
import "./About.css"; // 👈 import styles

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Our Company</h1>
        <p>Building innovation, trust, and excellence since 2006.</p>
      </section>

      {/* CEO Section */}
      <section className="about-ceo">
        <div className="about-ceo-img">
          <img src="/images/ceo.jpg" alt="CEO" />
        </div>
        <div className="about-ceo-text">
          <h2>Message from Our CEO</h2>
          <p>
            Welcome to our company! Since day one, our mission has been to deliver
            top-quality solutions with innovation and integrity. We are committed
            to driving growth for our partners and creating sustainable value for
            our customers worldwide.
          </p>
          <p className="ceo-name">— Shashikant Valatkar, CEO</p>
        </div>
      </section>

      {/* Company Section */}
      <section className="about-company">
        <h2>Our Company</h2>
        <p>
          Founded in 2006, we are a leading provider of innovative engineering and
          technology solutions. With a strong presence in multiple industries, our
          company has built a reputation for excellence, reliability, and customer
          satisfaction. From product design to large-scale industrial solutions, we
          are proud to be shaping the future.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            To provide reliable, innovative, and sustainable solutions that
            empower industries and improve lives.
          </p>
        </div>
        <div className="about-card">
          <h3>Our Vision</h3>
          <p>
            To be a global leader in engineering excellence and customer trust,
            shaping a better tomorrow.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2>Meet Our Leadership Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src="/images/team1.jpg" alt="Team Member 1" />
            <h3>Jane Smith</h3>
            <p>Chief Operating Officer</p>
          </div>
          <div className="team-card">
            <img src="/images/team2.jpg" alt="Team Member 2" />
            <h3>Michael Johnson</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-card">
            <img src="/images/team3.jpg" alt="Team Member 3" />
            <h3>Sarah Williams</h3>
            <p>Head of Marketing</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="about-stats">
        <div className="stat">
          <h2>18+</h2>
          <p>Years of Excellence</p>
        </div>
        <div className="stat">
          <h2>500+</h2>
          <p>Clients Worldwide</p>
        </div>
        <div className="stat">
          <h2>1000+</h2>
          <p>Projects Delivered</p>
        </div>
      </section>

      {/* Careers Section */}
      <section className="about-careers">
        <h2>Careers at Our Company</h2>
        <p>
          We’re always looking for passionate, talented people to join our growing
          team. If you’re ready to make an impact and grow your career, explore our
          opportunities today.
        </p>
        <button className="career-button">View Open Positions</button>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <h2>Let’s Build the Future Together</h2>
        <p>
          Partner with us and take your business to the next level with our
          cutting-edge solutions.
        </p>
        <button className="cta-button">Contact Us</button>
      </section>
    </div>
  );
};

export default About;
