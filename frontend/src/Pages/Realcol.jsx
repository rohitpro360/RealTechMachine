import React, { useState, useEffect } from "react";

export default function RealCol() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const columns = [
    {
      letter: "R",
      word: "Revolutionary",
      description: "Breaking boundaries and redefining what's possible",
      color: "linear-gradient(135deg, #fb7185, #ec4899)",
      accent: "#fb7185",
    },
    {
      letter: "E",
      word: "Evolutionary",
      description: "Constantly adapting and growing beyond limits",
      color: "linear-gradient(135deg, #a78bfa, #7c3aed)",
      accent: "#a78bfa",
    },
    {
      letter: "A",
      word: "Authentic",
      description: "True to purpose, genuine in every interaction",
      color: "linear-gradient(135deg, #60a5fa, #4f46e5)",
      accent: "#60a5fa",
    },
    {
      letter: "L",
      word: "Limitless",
      description: "Boundless potential waiting to be unleashed",
      color: "linear-gradient(135deg, #34d399, #0d9488)",
      accent: "#34d399",
    },
  ];

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center w-100 py-5">
      <style>{`
        .realcol-container {
          display: flex;
          gap: 10px;
          width: 100%;
          max-width: 1400px;
          height: 600px;
        }

        /* Mobile responsive stack */
        @media (max-width: 768px) {
          .realcol-container {
            flex-direction: column;
            height: auto;
          }
        }

        .realcol-column {
          flex: 1;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: all 0.6s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px 20px;
          color: white;
          min-height: 200px;
        }

        .realcol-letter {
          font-size: 4rem;
          font-weight: 900;
          font-family: "Playfair Display", serif;
          transition: all 0.5s ease;
        }

        .realcol-expanded {
          position: absolute;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
          max-width: 400px;
          padding: 0 15px;
        }

        .realcol-word {
          font-size: 2.2rem;
          font-weight: 700;
          font-family: "Playfair Display", serif;
        }

        .realcol-line {
          height: 4px;
          width: 70px;
          margin: 10px auto;
          border-radius: 5px;
        }

        .realcol-desc {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .realcol-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 50px rgba(255,255,255,0.25);
          animation: glowPulse 2s infinite ease-in-out;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <div className="realcol-container">
        {columns.map((col, index) => {
          const isActive = hoveredIndex === index;

          // Mobile → click to expand
          const handleClick = () => {
            if (isMobile) setHoveredIndex(isActive ? null : index);
          };

          return (
            <div
              key={col.letter}
              className="realcol-column"
              style={{
                background: col.color,

                // Desktop hover behavior
                flex: !isMobile
                  ? isActive
                    ? 3
                    : hoveredIndex === null
                    ? 1
                    : 0.5
                  : 1,

                opacity: !isMobile && hoveredIndex !== null && !isActive ? 0.4 : 1,
              }}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              onClick={handleClick}
            >
              {/* Letter view */}
              <div
                className="realcol-letter"
                style={{
                  opacity: isActive ? 0 : 1,
                  transform: isActive ? "scale(0.7)" : "scale(1)",
                  position: isActive ? "absolute" : "relative",
                }}
              >
                {col.letter}
              </div>

              {/* Expanded view */}
              <div
                className="realcol-expanded"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="realcol-word">{col.word}</div>

                <div
                  className="realcol-line"
                  style={{ background: col.accent }}
                />

                <p className="realcol-desc">{col.description}</p>
              </div>

              {isActive && <div className="realcol-glow"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
