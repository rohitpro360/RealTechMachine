import React, { useEffect, useRef, useState } from "react";
import "./About.css";

/* ── tiny hook: triggers when element enters viewport ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ── animated counter ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const About = () => {
  /* smooth scroll for hero links */
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest(".hero-links a");
      if (!link) return;
      e.preventDefault();
      const target = document.getElementById(link.getAttribute("href").substring(1));
      if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const [heroRef, heroIn] = useInView(0.1);
  const [ceoRef, ceoIn] = useInView();
  const [missionRef, missionIn] = useInView();
  const [teamRef, teamIn] = useInView();
  const [ctaRef, ctaIn] = useInView();

  const teamMembers = [
    { img: "/images/team1.jpg", name: "Jane Smith",      role: "Chief Operating Officer" },
    { img: "/images/team2.jpg", name: "Michael Johnson", role: "Chief Technology Officer" },
    { img: "/images/team3.jpg", name: "Sarah Williams",  role: "Head of Marketing" },
  ];

  return (
    <div className="about-page">

      {/* ══════════════════════════════════════
          HERO — full-width, no container clipping
      ══════════════════════════════════════ */}
      <section className="about-hero-modern" ref={heroRef}>
        <div className="hero-bg-container">
          <img
            src="/images/Slider3.jpg"
            alt="Hero Background"
            className="hero-bg"
          />
          <div className="hero-overlay" />
        </div>

        <div className={`hero-content ${heroIn ? "hero-content--visible" : ""}`}>
          <span className="hero-eyebrow">SO-SO IS A NO GO</span>
          <h1>
            make it <span className="hero-accent">amazing</span>
          </h1>
          <p className="hero-sub">
            Delivering innovative engineering &amp; technology solutions since 2006
          </p>
          <div className="hero-links">
            <a href="#company">Company</a>
            <a href="#stats">Project Stats</a>
            <a href="#careers">Careers</a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="hero-scroll-indicator">
          <span />
        </div>
      </section>

      {/* ══════════════════════════════════════
          CEO MESSAGE
      ══════════════════════════════════════ */}
      <section className={`about-ceo ${ceoIn ? "section--visible" : ""}`} ref={ceoRef}>
        <div className="about-ceo-img">
          <img src="/images/ceo.jpg" alt="CEO Shashikant Valatkar" />
          <div className="ceo-img-ring" />
        </div>
        <div className="about-ceo-text">
          <span className="section-label">Leadership</span>
          <h2>Message from Our CEO</h2>
          <p>
            Welcome to our company! Since day one, our mission has been to deliver
            top-quality solutions with innovation and integrity. We are committed
            to driving growth for our partners and creating sustainable value for
            our customers worldwide.
          </p>
          <p className="ceo-name">— Shashikant Valatkar, CEO &amp; Founder</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUR COMPANY
      ══════════════════════════════════════ */}
      <section id="company" className="about-company">
        <div className="about-company-inner">
          <span className="section-label">Who We Are</span>
          <h2>Our Company</h2>
          <p>
            Founded in 2006, we are a leading provider of innovative engineering and
            technology solutions. With a strong presence in multiple industries, our
            company has built a reputation for excellence, reliability, and customer
            satisfaction. From product design to large-scale industrial solutions, we
            are proud to be shaping the future.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION & VISION
      ══════════════════════════════════════ */}
      <section
        className={`about-mission ${missionIn ? "section--visible" : ""}`}
        ref={missionRef}
      >
        <div className="about-card stagger-1">
          <div className="card-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To provide reliable, innovative, and sustainable solutions that
            empower industries and improve lives across the globe.
          </p>
        </div>
        <div className="about-card stagger-2">
          <div className="card-icon">🔭</div>
          <h3>Our Vision</h3>
          <p>
            To be a global leader in engineering excellence and customer trust,
            shaping a better tomorrow through cutting-edge technology.
          </p>
        </div>
        <div className="about-card stagger-3">
          <div className="card-icon">💡</div>
          <h3>Our Values</h3>
          <p>
            Integrity, innovation, and impact — the three pillars that guide every
            decision we make and every product we build.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
      ══════════════════════════════════════ */}
      <section id="stats" className="about-stats">
        <div className="stat">
          <h2><Counter target={18} suffix="+" /></h2>
          <p>Years of Excellence</p>
        </div>
        <div className="stat">
          <h2><Counter target={500} suffix="+" /></h2>
          <p>Clients Worldwide</p>
        </div>
        <div className="stat">
          <h2><Counter target={1000} suffix="+" /></h2>
          <p>Projects Delivered</p>
        </div>
        <div className="stat">
          <h2><Counter target={98} suffix="%" /></h2>
          <p>Client Satisfaction</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <section
        className={`about-team ${teamIn ? "section--visible" : ""}`}
        ref={teamRef}
      >
        <span className="section-label">The People Behind It</span>
        <h2>Meet Our Leadership Team</h2>
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div className={`team-card stagger-${i + 1}`} key={i}>
              <div className="team-img-wrap">
                <img src={m.img} alt={m.name} />
                <div className="team-img-overlay" />
              </div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CAREERS
      ══════════════════════════════════════ */}
      <section id="careers" className="about-careers">
        <div className="careers-inner">
          <span className="section-label">Join Us</span>
          <h2>Careers at Our Company</h2>
          <p>
            We're always looking for passionate, talented people to join our growing
            team. If you're ready to make an impact and grow your career, explore our
            opportunities today.
          </p>
          <button className="career-button">View Open Positions</button>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CALL TO ACTION
      ══════════════════════════════════════ */}
      <section
        className={`about-cta ${ctaIn ? "section--visible" : ""}`}
        ref={ctaRef}
      >
        <h2>Let's Build the Future Together</h2>
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