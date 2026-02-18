import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// ─── Data ───────────────────────────────────────────────
const ADVANTAGES = [
  {
    id: "01",
    title: "Cost Efficiency",
    desc: "Our component cleaning machines can lead to cost savings in the future through decreased equipment failures and maintenance costs.",
    icon: "💰",
  },
  {
    id: "02",
    title: "Eco-Friendly",
    desc: "Numerous modern cleaning devices use safe solvents and techniques that are environmentally friendly and help companies comply with environmental regulations.",
    icon: "🌿",
  },
  {
    id: "03",
    title: "Consistent Cleaning",
    desc: "Automated cleaning machines provide consistent cleaning outcomes and ensure that all components are cleaned uniformly every single time.",
    icon: "⚙️",
  },
  {
    id: "04",
    title: "Less Contaminants",
    desc: "The contamination can be reduced by using this cleaning equipment, leading to fewer product defects or recalls across production lines.",
    icon: "🛡️",
  },
  {
    id: "05",
    title: "Reduced Labor",
    desc: "Automating the cleaning process can lower the need for human labor and allow teams to focus on more valuable, high-priority tasks.",
    icon: "🤖",
  },
];

const APPLICATIONS = [
  {
    title: "Factories",
    desc: "Ideal for cleaning tools, molds, and parts throughout various manufacturing processes — giving smooth production line operation.",
    icon: "🏭",
    color: "#1565c0",
  },
  {
    title: "Medical Equipment",
    desc: "Ultrasonic and rotary models are used for cleaning medical equipment to uphold hygiene and safety standards.",
    icon: "🏥",
    color: "#0d47a1",
  },
  {
    title: "Industrial Maintenance",
    desc: "Our cleaning component machines increase high performance and extend the life of heavy industrial equipment.",
    icon: "🔧",
    color: "#1976d2",
  },
  {
    title: "Food Industry",
    desc: "Delivered to the food sector for sanitizing food item machinery to prevent contamination and comply with health standards.",
    icon: "🍽️",
    color: "#1565c0",
  },
  {
    title: "3D Printing",
    desc: "Thoroughly cleaning printed components to eliminate support materials and residues and guarantee top-notch final products.",
    icon: "🖨️",
    color: "#0d47a1",
  },
];

// ─── Scoped CSS ──────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── Section ── */
  .adv-section {
    background: #ffffff;
    padding: 90px 0 80px;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Subtle dot grid */
  .adv-section::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(rgba(21,101,192,0.08) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  /* ── Section Label ── */
  .adv-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.75rem; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: #1565c0; margin-bottom: 14px;
  }
  .adv-eyebrow::before, .adv-eyebrow::after {
    content: ''; display: block; width: 36px; height: 1px; background: #1565c0;
  }

  /* ── Block Title ── */
  .adv-block-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 900; color: #0a1f44;
    line-height: 1.05; text-transform: uppercase; letter-spacing: -1px;
    margin-bottom: 0;
  }
  .adv-block-title span { color: #1565c0; }

  /* ── Scroll reveal ── */
  .adv-reveal {
    opacity: 0; transform: translateY(40px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .adv-reveal.adv-in { opacity: 1; transform: translateY(0); }

  /* ══════════════════════════════
     ADVANTAGES — horizontal cards
  ══════════════════════════════ */
  .adv-card {
    background: #f5f9ff;
    border: 1px solid rgba(21,101,192,0.1);
    border-radius: 16px;
    padding: 28px 26px;
    height: 100%;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    cursor: default;
  }
  .adv-card::before {
    content: attr(data-id);
    position: absolute; bottom: -18px; right: -8px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 100px; font-weight: 900;
    color: rgba(21,101,192,0.04);
    line-height: 1; pointer-events: none; user-select: none;
  }
  .adv-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(21,101,192,0.12);
    border-color: rgba(21,101,192,0.3);
  }
  .adv-card:hover .adv-accent-bar { width: 100%; }

  .adv-accent-bar {
    position: absolute; top: 0; left: 0;
    height: 3px; width: 0;
    background: linear-gradient(90deg, #1565c0, #42a5f5);
    border-radius: 3px 3px 0 0;
    transition: width 0.4s ease;
  }

  .adv-icon-box {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, #1565c0, #42a5f5);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 16px;
    box-shadow: 0 4px 14px rgba(21,101,192,0.25);
    transition: transform 0.3s;
  }
  .adv-card:hover .adv-icon-box { transform: rotate(-6deg) scale(1.1); }

  .adv-card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.25rem; font-weight: 800;
    color: #0a1f44; text-transform: uppercase;
    letter-spacing: 0.5px; margin-bottom: 10px;
  }
  .adv-card-desc {
    font-size: 0.88rem; color: #607d8b; line-height: 1.7; margin: 0;
  }

  /* ══════════════════════════════
     APPLICATIONS — timeline style
  ══════════════════════════════ */
  .app-section {
    background: linear-gradient(135deg, #0a1f44 0%, #1565c0 100%);
    padding: 80px 0 90px;
    position: relative; overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }
  .app-section::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .app-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 900; color: #ffffff;
    line-height: 1.05; text-transform: uppercase; letter-spacing: -1px;
  }
  .app-title span { color: #64b5f6; }

  /* Timeline line */
  .app-timeline { position: relative; padding-left: 0; }
  .app-timeline::before {
    content: '';
    position: absolute; left: 22px; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(100,181,246,0.4), transparent);
  }

  .app-item {
    display: flex; gap: 24px; align-items: flex-start;
    margin-bottom: 36px; position: relative;
    opacity: 0; transform: translateX(-30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .app-item.adv-in { opacity: 1; transform: translateX(0); }

  .app-dot {
    flex-shrink: 0; width: 46px; height: 46px;
    background: rgba(255,255,255,0.08);
    border: 1.5px solid rgba(100,181,246,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    position: relative; z-index: 1;
    transition: background 0.3s, border-color 0.3s;
    cursor: default;
  }
  .app-item:hover .app-dot {
    background: rgba(100,181,246,0.2);
    border-color: #64b5f6;
  }

  .app-content { padding-top: 6px; }
  .app-item-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1.2rem; font-weight: 800;
    color: #ffffff; text-transform: uppercase;
    letter-spacing: 0.5px; margin-bottom: 5px;
  }
  .app-item-desc { font-size: 0.88rem; color: rgba(255,255,255,0.65); line-height: 1.7; margin: 0; }

  /* Right image / visual stack */
  .app-visual { position: relative; display: flex; align-items: center; justify-content: center; }
  .app-big-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(7rem, 14vw, 12rem);
    font-weight: 900; color: rgba(255,255,255,0.04);
    line-height: 1; text-transform: uppercase;
    letter-spacing: -4px;
    position: absolute; white-space: nowrap;
    user-select: none; pointer-events: none;
  }

  .app-stat-stack {
    display: flex; flex-direction: column; gap: 20px; z-index: 1; width: 100%;
  }
  .app-stat-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(100,181,246,0.2);
    border-radius: 14px; padding: 22px 26px;
    backdrop-filter: blur(8px);
    transition: background 0.3s, border-color 0.3s;
    cursor: default;
  }
  .app-stat-card:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(100,181,246,0.5);
  }
  .app-stat-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 2.8rem; font-weight: 900;
    background: linear-gradient(135deg, #fff, #64b5f6);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; line-height: 1;
  }
  .app-stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.5); font-weight: 500; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }

  /* ── Closing CTA block ── */
  .adv-cta-block {
    background: #f0f6ff;
    border-top: 1px solid rgba(21,101,192,0.1);
    padding: 56px 0;
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }
  .adv-cta-block::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(rgba(21,101,192,0.06) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .adv-cta-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 800; color: #0a1f44;
    line-height: 1.2; text-transform: uppercase;
    letter-spacing: -0.5px;
  }
  .adv-cta-text span { color: #1565c0; }
  .adv-cta-sub { font-size: 0.95rem; color: #607d8b; line-height: 1.7; max-width: 560px; }
  .adv-cta-btn {
    background: linear-gradient(135deg, #1565c0, #42a5f5);
    color: #fff; border: none; border-radius: 50px;
    padding: 14px 36px; font-weight: 700; font-size: 1rem;
    cursor: pointer; box-shadow: 0 6px 22px rgba(21,101,192,0.35);
    transition: all 0.25s; white-space: nowrap;
  }
  .adv-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(21,101,192,0.45); }
`;

// ─── Component ────────────────────────────────────────────
export default function Advantage() {
  const revealRefs = useRef([]);
  const appRefs = useRef([]);
  const [revealVisible, setRevealVisible] = useState([]);
  const [appVisible, setAppVisible] = useState([]);

  // Generic reveal observer factory
  const makeObserver = (setFn, threshold = 0.15) =>
    new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = parseInt(e.target.dataset.idx);
            setFn(prev => { const n = [...prev]; n[idx] = true; return n; });
          }
        }),
      { threshold }
    );

  useEffect(() => {
    setRevealVisible(new Array(revealRefs.current.length).fill(false));
    setAppVisible(new Array(APPLICATIONS.length).fill(false));

    const obs1 = makeObserver(setRevealVisible);
    const obs2 = makeObserver(setAppVisible);

    revealRefs.current.forEach((el, i) => { if (el) { el.dataset.idx = i; obs1.observe(el); } });
    appRefs.current.forEach((el, i)    => { if (el) { el.dataset.idx = i; obs2.observe(el); } });

    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  const addRevealRef = i => el => (revealRefs.current[i] = el);
  const addAppRef   = i => el => (appRefs.current[i] = el);

  return (
    <>
      <style>{css}</style>

      {/* ══════════════════════════════
          ADVANTAGES SECTION
      ══════════════════════════════ */}
      <section className="adv-section">
        <Container style={{ position: "relative", zIndex: 1 }}>

          {/* Header */}
          <Row className="mb-5">
            <Col>
              <div
                ref={addRevealRef(0)}
                className={`adv-reveal${revealVisible[0] ? " adv-in" : ""}`}
              >
                <div className="adv-eyebrow">Advantages</div>
                <h2 className="adv-block-title">
                  Why Choose <span>Our Machines</span>
                </h2>
              </div>
            </Col>
          </Row>

          {/* Advantage Cards */}
          <Row className="g-4">
            {ADVANTAGES.map((adv, i) => (
              <Col key={adv.id} md={6} lg={i < 3 ? 4 : 6}>
                <div
                  ref={addRevealRef(i + 1)}
                  className={`adv-reveal${revealVisible[i + 1] ? " adv-in" : ""}`}
                  style={{ transitionDelay: `${i * 0.08}s`, height: "100%" }}
                >
                  <div className="adv-card" data-id={adv.id}>
                    <div className="adv-accent-bar" />
                    <div className="adv-icon-box">{adv.icon}</div>
                    <h4 className="adv-card-title">{adv.title}</h4>
                    <p className="adv-card-desc">{adv.desc}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

        </Container>
      </section>

      {/* ══════════════════════════════
          APPLICATIONS SECTION
      ══════════════════════════════ */}
      <section className="app-section">
        <Container style={{ position: "relative", zIndex: 1 }}>

          {/* Header */}
          <Row className="mb-5">
            <Col>
              <div className="adv-eyebrow" style={{ color: "#64b5f6" }}>
                <span style={{ background: "#64b5f6", display: "block", width: 36, height: 1 }} />
                Applications
                <span style={{ background: "#64b5f6", display: "block", width: 36, height: 1 }} />
              </div>
              <h2 className="app-title">
                Where Our <span>Machines</span>
                <br />Make an Impact
              </h2>
            </Col>
          </Row>

          <Row className="g-5 align-items-center">

            {/* Left — Timeline */}
            <Col lg={6}>
              <div className="app-timeline">
                {APPLICATIONS.map((app, i) => (
                  <div
                    key={app.title}
                    ref={addAppRef(i)}
                    className={`app-item${appVisible[i] ? " adv-in" : ""}`}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <div className="app-dot">{app.icon}</div>
                    <div className="app-content">
                      <div className="app-item-title">{app.title}</div>
                      <p className="app-item-desc">{app.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>

            {/* Right — Stat cards */}
            <Col lg={6}>
              <div className="app-visual">
                <div className="app-big-text">CLEAN</div>
                <div className="app-stat-stack">
                  {[
                    { num: "5+",   label: "Industry Sectors Served"   },
                    { num: "200+", label: "Machines Delivered Globally" },
                    { num: "15+",  label: "Years of Engineering Excellence" },
                    { num: "99%",  label: "Client Satisfaction Rate"   },
                  ].map(s => (
                    <div key={s.label} className="app-stat-card">
                      <div className="app-stat-num">{s.num}</div>
                      <div className="app-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </section>

      {/* ══════════════════════════════
          CLOSING CTA
      ══════════════════════════════ */}
      <div className="adv-cta-block">
        <Container style={{ position: "relative", zIndex: 1 }}>
          <Row className="align-items-center gy-4">
            <Col lg={8}>
              <h3 className="adv-cta-text">
                Leading <span>Component Cleaning Machine</span>
                <br />Manufacturers, Suppliers & Exporters in Pune
              </h3>
              <p className="adv-cta-sub mt-3">
                As the leading manufacturers, suppliers, and exporters in Pune, Techno Mac Systems
                concentrate on customer satisfaction above all else. We manufacture industrial component
                cleaning machines in a range of sizes and specifications, using premium materials and
                rigorous testing to guarantee high-quality performance across all our goods.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <button className="adv-cta-btn">Get in Touch →</button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}