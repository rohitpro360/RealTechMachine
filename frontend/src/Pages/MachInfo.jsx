import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// ─── Data ───────────────────────────────────────────────
const MACHINES = [
  {
    id: "01",
    title: "Rotary Cabinet-type Component Cleaning Machine",
    short: "Rotary Cabinet Cleaner",
    tag: "Surface Treatment",
    highlights: ["Revolving drum mechanism", "Aqueous & solvent support", "Filtration & recycling system"],
    description:
      "Designed to clean small to medium-sized components using a revolving drum or cabinet. The rotation provides the cleaning solution to evenly coat all surfaces of each part. Machines utilize either aqueous detergents or solvents depending on the type of contaminants present. Many models feature filtration systems that recycle the cleaning solution, boost efficiency, and reduce waste.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="48" height="48">
        <circle cx="32" cy="32" r="20" stroke="#42a5f5" strokeWidth="2" strokeDasharray="6 3" />
        <circle cx="32" cy="32" r="10" fill="#1565c0" opacity="0.3" />
        <circle cx="32" cy="32" r="4" fill="#42a5f5" />
        <path d="M32 12L32 8M32 56L32 52M12 32L8 32M56 32L52 32" stroke="#42a5f5" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 20L16 16M48 48L44 44M44 20L48 16M20 44L16 48" stroke="#42a5f5" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Component Cleaning Machine with Blasting",
    short: "Blast Cleaning System",
    tag: "Abrasive Technology",
    highlights: ["High-speed abrasive projection", "Compressed air or wheel-driven", "Sand / glass bead / steel shot"],
    description:
      "Uses high-speed abrasive materials to clean various surfaces. These tools project substances such as sand, glass beads, or steel shot onto the surfaces in order to remove rust, paint, and other contaminants. Cleaning can be achieved by using compressed air or a mechanical wheel that accelerates the abrasive material.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="48" height="48">
        <path d="M10 54L28 20L36 30L44 10L54 54Z" stroke="#64b5f6" strokeWidth="2" strokeLinejoin="round" fill="#0d47a1" fillOpacity="0.2" />
        <circle cx="20" cy="44" r="2" fill="#64b5f6" />
        <circle cx="34" cy="36" r="2" fill="#64b5f6" />
        <circle cx="42" cy="28" r="2" fill="#64b5f6" />
        <circle cx="48" cy="46" r="2" fill="#64b5f6" />
        <path d="M8 48 Q16 40 24 48 Q32 56 40 48 Q48 40 56 48" stroke="#64b5f6" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Ultrasonic Cleaning Machine",
    short: "Ultrasonic Cavitation Cleaner",
    tag: "Precision Cleaning",
    highlights: ["Cavitation bubble technology", "Temperature-controlled bath", "Multi-solvent compatibility"],
    description:
      "Creates tiny bubbles in the cleaning solution, known as cavitation. When these bubbles implode, they generate powerful shock waves that eliminate surface impurities and provide purification. Temperature control options in ultrasonic cleaners can increase the quality of the cleaning process. There are a variety of cleaning solutions designed to remove various types of pollutants and other substances.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" width="48" height="48">
        <path d="M32 8 Q40 20 32 32 Q24 44 32 56" stroke="#90caf9" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M20 16 Q28 24 20 32 Q12 40 20 48" stroke="#90caf9" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M44 16 Q52 24 44 32 Q36 40 44 48" stroke="#90caf9" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <circle cx="32" cy="32" r="5" fill="#90caf9" opacity="0.4" />
        <circle cx="32" cy="32" r="2" fill="#90caf9" />
      </svg>
    ),
  },
];

// ─── Inline styles ───────────────────────────────────────
const styles = {
  section: {
    background: "#f0f6ff",
    padding: "80px 0 100px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },
  gridBg: {
    position: "absolute", inset: 0, pointerEvents: "none",
    backgroundImage:
      "linear-gradient(rgba(21,101,192,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(21,101,192,0.06) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },
  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 10,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "0.8rem", fontWeight: 700, letterSpacing: 3,
    textTransform: "uppercase", color: "#1565c0", marginBottom: 16,
  },
  eyebrowLine: { display: "block", width: 40, height: 1, background: "#1565c0" },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
    fontWeight: 900, color: "#0a1f44",
    lineHeight: 1, textTransform: "uppercase", letterSpacing: -1,
  },
  sectionTitleAccent: { color: "#1565c0" },
  subtitle: {
    fontSize: "1rem", color: "#607d8b", marginTop: 14,
    fontWeight: 400, lineHeight: 1.65,
  },
  cardWrapper: {
    borderTop: "1px solid rgba(21,101,192,0.12)",
    position: "relative",
    transition: "all 0.3s",
  },
  cardWrapperLast: {
    borderBottom: "1px solid rgba(21,101,192,0.12)",
  },
  visualPanel: {
    position: "relative",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "56px 40px",
    background: "linear-gradient(135deg, #e3f0ff, #f0f6ff)",
    borderRight: "1px solid rgba(21,101,192,0.1)",
    overflow: "hidden",
    minHeight: 300,
    transition: "background 0.3s",
  },
  visualPanelReversed: {
    borderRight: "none",
    borderLeft: "1px solid rgba(21,101,192,0.1)",
  },
  bgNumber: {
    position: "absolute",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 200, fontWeight: 900,
    color: "rgba(21,101,192,0.06)", lineHeight: 1,
    top: "50%", left: "50%", transform: "translate(-50%,-50%)",
    pointerEvents: "none", userSelect: "none", letterSpacing: -10,
  },
  visualInner: {
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 18, zIndex: 1, textAlign: "center",
  },
  iconWrap: {
    width: 90, height: 90, borderRadius: "50%",
    background: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 30px rgba(21,101,192,0.15)",
    position: "relative",
    transition: "all 0.3s",
  },
  numBadge: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "1rem", fontWeight: 800, letterSpacing: 2,
    color: "#1565c0", textTransform: "uppercase",
  },
  tagBadge: {
    background: "#1565c0", color: "#fff",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "0.72rem", fontWeight: 700, letterSpacing: 2,
    textTransform: "uppercase", padding: "4px 14px",
    borderRadius: 4, display: "inline-block",
  },
  corner: {
    position: "absolute", width: 20, height: 20,
    borderColor: "rgba(21,101,192,0.3)", borderStyle: "solid", borderWidth: 0,
  },
  contentPanel: {
    padding: "52px 48px",
    display: "flex", flexDirection: "column", justifyContent: "center",
  },
  contentNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "0.8rem", fontWeight: 700, letterSpacing: 3,
    textTransform: "uppercase", color: "#42a5f5", marginBottom: 12,
  },
  contentTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)",
    fontWeight: 800, color: "#0a1f44",
    lineHeight: 1.1, textTransform: "uppercase",
    letterSpacing: -0.5, marginBottom: 20,
  },
  highlightPill: {
    display: "inline-flex", alignItems: "center", gap: 6,
    fontSize: "0.78rem", fontWeight: 500, color: "#1565c0",
    background: "rgba(21,101,192,0.07)",
    border: "1px solid rgba(21,101,192,0.15)",
    borderRadius: 6, padding: "5px 12px",
    marginRight: 8, marginBottom: 8,
  },
  desc: {
    fontSize: "0.97rem", color: "#546e7a", lineHeight: 1.8,
    borderLeft: "3px solid #42a5f5", paddingLeft: 18, margin: 0,
  },
};

// ─── Scoped CSS for animations ────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500&display=swap');

  .mi-icon-ring::after {
    content: ''; position: absolute; inset: -6px; border-radius: 50%;
    border: 1.5px dashed rgba(21,101,192,0.25);
    animation: miRotate 12s linear infinite;
  }
  @keyframes miRotate { to { transform: rotate(360deg); } }

  .mi-scan {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(66,165,245,0.6), transparent);
    animation: miScan 3s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes miScan {
    0%   { top: 0%;   opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  .mi-card-row {
    opacity: 0; transform: translateY(50px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .mi-card-row.mi-visible { opacity: 1; transform: translateY(0); }

  .mi-card-row:hover .mi-visual-panel {
    background: linear-gradient(135deg, #dbeeff, #eaf4ff) !important;
  }
  .mi-card-row:hover .mi-icon-wrap-inner {
    box-shadow: 0 12px 36px rgba(21,101,192,0.28) !important;
    transform: scale(1.05);
  }

  .mi-underline-bar {
    position: absolute; bottom: 0; left: 0;
    height: 2px; width: 0;
    background: linear-gradient(90deg, #1565c0, #42a5f5, transparent);
    transition: width 0.6s ease;
  }
  .mi-card-row:hover .mi-underline-bar { width: 100%; }

  .mi-corner-tl { top: 12px; left: 12px; border-top-width: 2px !important; border-left-width: 2px !important; }
  .mi-corner-tr { top: 12px; right: 12px; border-top-width: 2px !important; border-right-width: 2px !important; }
  .mi-corner-bl { bottom: 12px; left: 12px; border-bottom-width: 2px !important; border-left-width: 2px !important; }
  .mi-corner-br { bottom: 12px; right: 12px; border-bottom-width: 2px !important; border-right-width: 2px !important; }
`;

// ─── Component ────────────────────────────────────────────
export default function MachInfo() {
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState(MACHINES.map(() => false));

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => { const n = [...prev]; n[i] = true; return n; });
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  return (
    <>
      <style>{css}</style>

      <section style={styles.section}>
        {/* Blueprint grid */}
        <div style={styles.gridBg} />

        <Container style={{ position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <div style={styles.eyebrow}>
                <span style={styles.eyebrowLine} />
                Our Machine Lineup
                <span style={styles.eyebrowLine} />
              </div>
              <h2 style={styles.sectionTitle}>
                Built to <span style={styles.sectionTitleAccent}>Clean.</span>
                <br />Engineered to Last.
              </h2>
              <p style={styles.subtitle}>
                Three precision-engineered cleaning systems for every industrial challenge —
                from delicate components to heavy-duty surface prep.
              </p>
            </Col>
          </Row>

          {/* ── Machine Cards ── */}
          {MACHINES.map((machine, i) => {
            const isEven = i % 2 !== 0;
            const isLast = i === MACHINES.length - 1;

            const VisualCol = (
              <Col
                md={5}
                className="p-0 mi-visual-panel"
                style={{
                  ...styles.visualPanel,
                  ...(isEven ? styles.visualPanelReversed : {}),
                }}
              >
                {/* Ghost number */}
                <div style={styles.bgNumber}>{machine.id}</div>

                {/* Scan line */}
                <div className="mi-scan" style={{ animationDelay: `${i * 1.1}s` }} />

                {/* Corner decorations */}
                <div style={styles.corner} className="mi-corner-tl" />
                <div style={styles.corner} className="mi-corner-tr" />
                <div style={styles.corner} className="mi-corner-bl" />
                <div style={styles.corner} className="mi-corner-br" />

                {/* Icon + labels */}
                <div style={styles.visualInner}>
                  <div style={styles.iconWrap} className="mi-icon-ring mi-icon-wrap-inner">
                    {machine.icon}
                  </div>
                  <div style={styles.numBadge}>Machine {machine.id}</div>
                  <span style={styles.tagBadge}>{machine.tag}</span>
                </div>
              </Col>
            );

            const ContentCol = (
              <Col md={7} className="p-0">
                <div style={styles.contentPanel}>
                  <div style={styles.contentNum}>
                    / {machine.id} — {machine.short}
                  </div>
                  <h3 style={styles.contentTitle}>{machine.title}</h3>

                  {/* Highlight pills */}
                  <div className="mb-3">
                    {machine.highlights.map(h => (
                      <span key={h} style={styles.highlightPill}>
                        <span style={{ fontSize: "0.5rem", color: "#42a5f5" }}>◆</span>
                        {h}
                      </span>
                    ))}
                  </div>

                  <p style={styles.desc}>{machine.description}</p>
                </div>
              </Col>
            );

            return (
              <div
                key={machine.id}
                ref={el => (cardRefs.current[i] = el)}
                className={`mi-card-row${visible[i] ? " mi-visible" : ""}`}
                style={{
                  ...styles.cardWrapper,
                  ...(isLast ? styles.cardWrapperLast : {}),
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <Row className="g-0 align-items-stretch">
                  {isEven ? <>{ContentCol}{VisualCol}</> : <>{VisualCol}{ContentCol}</>}
                </Row>
                {/* Hover underline bar */}
                <div className="mi-underline-bar" />
              </div>
            );
          })}

        </Container>
      </section>
    </>
  );
}