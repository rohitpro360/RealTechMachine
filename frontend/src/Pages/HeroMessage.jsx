import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ─── Real machine images from Unsplash (free to use) ───
const IMAGES = {
  cnc:    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=85&auto=format&fit=crop",
  factory:"https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&q=85&auto=format&fit=crop",
  robot:  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=85&auto=format&fit=crop",
};

const MACHINES = [
  "Crankshaft Machines",
  "Robotic Cleaning Systems",
  "Indexing Bin Cleaning Machine",
  "Conveyorised Bin Tray Cleaning Machine",
  "Industrial Solutions",
  "Ultrasonic Cleaning Machine",
];

const STATS = [
  { target: 200, suffix: "+", label: "Machines Delivered" },
  { target: 15,  suffix: "+", label: "Years of Excellence" },
  { target: 40,  suffix: "+", label: "Industry Partners"  },
  { target: 99,  suffix: "%", label: "Client Satisfaction" },
];

const MARQUEE_ITEMS = [
  ["⚙️","Crankshaft Machines"],["🤖","Robotic Cleaning Systems"],
  ["🔩","Indexing Bin Cleaning Machine"],["📡","Smart Automation"],
  ["🏭","Industrial Solutions"],["⚡","High-Performance Engineering"],["🔧","Maintenance & Support"],
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  .rt-hero {
    min-height:100vh; background:linear-gradient(145deg,#e8f4fd 0%,#f5faff 35%,#ffffff 60%,#dbeeff 100%);
    position:relative; overflow:hidden; display:flex; flex-direction:column;
    font-family:'Inter','Segoe UI',sans-serif;
  }
  .rt-grid {
    position:absolute; inset:0; pointer-events:none; z-index:0;
    background-image: linear-gradient(rgba(21,101,192,0.04) 1px,transparent 1px), linear-gradient(90deg,rgba(21,101,192,0.04) 1px,transparent 1px);
    background-size:50px 50px; animation:rtGridMove 20s linear infinite;
  }
  @keyframes rtGridMove { from{background-position:0 0,0 0} to{background-position:50px 50px,50px 50px} }
  .rt-blob { position:absolute; border-radius:50%; pointer-events:none; filter:blur(60px); animation:rtBlob ease-in-out infinite alternate; }
  .rt-blob-1 { width:450px;height:450px;top:-100px;right:-80px;background:rgba(66,165,245,0.12);animation-duration:6s; }
  .rt-blob-2 { width:350px;height:350px;bottom:-50px;left:-60px;background:rgba(21,101,192,0.09);animation-duration:8s; }
  .rt-blob-3 { width:200px;height:200px;top:40%;left:25%;background:rgba(100,181,246,0.07);animation-duration:7s; }
  @keyframes rtBlob { from{transform:scale(1) rotate(0deg)} to{transform:scale(1.15) rotate(15deg)} }
  .rt-particle { position:absolute; border-radius:50%; opacity:0; animation:rtFloat linear infinite; }
  @keyframes rtFloat { 0%{transform:translateY(100vh) scale(0);opacity:0} 10%{opacity:0.5} 90%{opacity:0.2} 100%{transform:translateY(-10vh) scale(1.2);opacity:0} }
  .rt-nav { position:fixed;top:0;left:0;right:0;z-index:999;padding:18px 0;transition:all 0.4s; }
  .rt-nav.scrolled { background:rgba(255,255,255,0.93);backdrop-filter:blur(14px);box-shadow:0 2px 24px rgba(21,101,192,0.1);padding:12px 0; }
  .rt-badge { display:inline-flex;align-items:center;gap:8px;background:rgba(66,165,245,0.1);color:#1565c0;border:1px solid rgba(66,165,245,0.3);border-radius:50px;padding:6px 18px;font-size:0.78rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:24px;animation:rtSlideDown 0.7s ease both; }
  .rt-badge-dot { width:8px;height:8px;border-radius:50%;background:#42a5f5;animation:rtPulse 1.5s ease-in-out infinite; }
  @keyframes rtPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0.5} }
  .rt-headline { font-size:clamp(2rem,4.5vw,3.3rem);font-weight:900;color:#0a1f44;line-height:1.15;animation:rtSlideUp 0.8s ease 0.1s both; }
  .rt-dynamic-wrap { min-height:1.3em;overflow:hidden;margin:6px 0 20px;animation:rtSlideUp 0.8s ease 0.2s both; }
  .rt-dynamic { color:#1565c0;font-weight:900;font-size:clamp(2rem,4.5vw,3.3rem);display:inline-block;animation:rtTextIn 0.5s cubic-bezier(0.4,0,0.2,1) both; }
  @keyframes rtTextIn  { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
  .rt-dynamic.exit { animation:rtTextOut 0.4s cubic-bezier(0.4,0,0.2,1) both; }
  @keyframes rtTextOut { from{transform:translateY(0);opacity:1} to{transform:translateY(-30px);opacity:0} }
  .rt-subtext { font-size:1.05rem;color:#546e7a;line-height:1.75;max-width:500px;margin-bottom:36px;animation:rtSlideUp 0.8s ease 0.3s both; }
  .rt-btn-row { display:flex;gap:14px;flex-wrap:wrap;animation:rtSlideUp 0.8s ease 0.4s both; }
  .rt-btn-primary { background:linear-gradient(135deg,#1565c0,#1e88e5);color:#fff;border:none;border-radius:50px;padding:15px 36px;font-weight:700;font-size:1rem;cursor:pointer;box-shadow:0 6px 22px rgba(21,101,192,0.38);transition:all 0.25s;position:relative;overflow:hidden; }
  .rt-btn-primary::after { content:'';position:absolute;inset:0;background:rgba(255,255,255,0.15);transform:translateX(-100%);transition:transform 0.3s; }
  .rt-btn-primary:hover { transform:translateY(-3px);box-shadow:0 12px 30px rgba(21,101,192,0.45); }
  .rt-btn-primary:hover::after { transform:translateX(0); }
  .rt-btn-outline { background:transparent;color:#1565c0;border:2px solid #1565c0;border-radius:50px;padding:13px 32px;font-weight:700;font-size:1rem;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:8px; }
  .rt-btn-outline:hover { background:#e8f4fd;transform:translateY(-2px); }
  .rt-play { width:28px;height:28px;border-radius:50%;background:#1565c0;display:flex;align-items:center;justify-content:center;transition:transform 0.25s; }
  .rt-btn-outline:hover .rt-play { transform:scale(1.15); }
  .rt-stats { display:flex;gap:0;margin-top:48px;flex-wrap:wrap;animation:rtSlideUp 0.8s ease 0.5s both; }
  .rt-stat { padding:0 28px 0 0;border-right:1px solid rgba(21,101,192,0.15);margin-right:28px;margin-bottom:16px; }
  .rt-stat:last-child { border-right:none; }
  .rt-stat-num { font-size:2rem;font-weight:900;background:linear-gradient(135deg,#1565c0,#42a5f5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
  .rt-stat-label { font-size:0.78rem;color:#90a4ae;font-weight:600;margin-top:2px;text-transform:uppercase;letter-spacing:0.5px; }
  .rt-collage { position:relative;height:540px;animation:rtSlideLeft 0.9s ease 0.2s both; }
  @keyframes rtSlideLeft { from{transform:translateX(60px);opacity:0} to{transform:translateX(0);opacity:1} }
  .rt-img-card { position:absolute;border-radius:20px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.18);border:3px solid #fff;cursor:pointer;transition:transform 0.35s,box-shadow 0.35s; }
  .rt-img-card img { width:100%;height:100%;object-fit:cover;display:block; }
  .rt-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(10,31,68,0.6) 0%,rgba(10,31,68,0.1) 60%,transparent 100%); }
  .rt-label { position:absolute;bottom:14px;left:14px;color:#fff;font-weight:700;font-size:0.85rem;text-shadow:0 1px 6px rgba(0,0,0,0.5);display:flex;align-items:center;gap:6px; }
  .rt-img-card:hover { transform:translateY(-8px) scale(1.03) !important;box-shadow:0 28px 60px rgba(0,0,0,0.25) !important; }
  .rt-card-main  { width:63%;height:330px;top:0;right:0;animation:rtFloat1 6s ease-in-out infinite; }
  .rt-card-sec   { width:52%;height:230px;bottom:10px;left:0;animation:rtFloat2 7s ease-in-out infinite; }
  .rt-card-third { width:40%;height:190px;bottom:0;right:4%;animation:rtFloat3 5s ease-in-out infinite; }
  @keyframes rtFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes rtFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}  }
  @keyframes rtFloat3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  .rt-chip { position:absolute;background:rgba(255,255,255,0.96);backdrop-filter:blur(10px);border-radius:16px;padding:10px 16px;display:flex;align-items:center;gap:10px;box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:10;font-size:0.8rem;font-weight:700;color:#263238;white-space:nowrap;animation:rtChip ease-in-out infinite alternate; }
  .rt-chip-1 { top:24px;left:-24px;animation-duration:3.5s; }
  .rt-chip-2 { top:50%;right:-14px;animation-duration:4.2s; }
  .rt-chip-3 { bottom:55px;left:45%;animation-duration:5s; }
  @keyframes rtChip { from{transform:translateY(0)} to{transform:translateY(-9px)} }
  .rt-chip-sub { font-size:0.7rem;color:#90a4ae;font-weight:500;margin-top:1px; }
  .rt-chip-green { width:10px;height:10px;border-radius:50%;background:#4caf50;flex-shrink:0;animation:rtPulse 1.5s ease-in-out infinite; }
  .rt-marquee { background:rgba(21,101,192,0.04);border-top:1px solid rgba(21,101,192,0.08);border-bottom:1px solid rgba(21,101,192,0.08);padding:14px 0;overflow:hidden;position:relative;z-index:2; }
  .rt-marquee-track { display:flex;gap:60px;width:max-content;animation:rtMarquee 28s linear infinite; }
  @keyframes rtMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .rt-marquee-item { display:flex;align-items:center;gap:10px;font-size:0.82rem;font-weight:700;color:#607d8b;text-transform:uppercase;letter-spacing:1px;white-space:nowrap; }
  .rt-marquee-sep { color:#42a5f5; }
  @keyframes rtSlideDown { from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes rtSlideUp   { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }
`;

export default function HeroMessage() {
  const [scrolled, setScrolled]     = useState(false);
  const [machineIdx, setMachineIdx] = useState(0);
  const [exiting, setExiting]       = useState(false);
  const [counters, setCounters]     = useState(STATS.map(() => 0));
  const [counted, setCounted]       = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setExiting(true);
      setTimeout(() => { setMachineIdx(i => (i + 1) % MACHINES.length); setExiting(false); }, 420);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (counted) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setCounted(true);
      STATS.forEach((stat, i) => {
        let val = 0;
        const inc = stat.target / (1800 / 16);
        const t = setInterval(() => {
          val = Math.min(val + inc, stat.target);
          setCounters(prev => { const n = [...prev]; n[i] = Math.round(val); return n; });
          if (val >= stat.target) clearInterval(t);
        }, 16);
      });
      observer.disconnect();
    }, { threshold: 0.3 });
    const el = document.getElementById("rt-stats-anchor");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [counted]);

  useEffect(() => {
    const wrap = document.getElementById("rt-particles");
    if (!wrap) return;
    const colors = ["rgba(66,165,245,0.5)","rgba(21,101,192,0.4)","rgba(100,181,246,0.4)"];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("div");
      p.className = "rt-particle";
      const size = Math.random() * 8 + 3;
      Object.assign(p.style, { width:`${size}px`, height:`${size}px`, left:`${Math.random()*100}%`, background:colors[Math.floor(Math.random()*colors.length)], animationDuration:`${Math.random()*12+8}s`, animationDelay:`${Math.random()*10}s` });
      wrap.appendChild(p);
    }
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="rt-hero">
        <div className="rt-grid"/>
        <div className="rt-blob rt-blob-1"/><div className="rt-blob rt-blob-2"/><div className="rt-blob rt-blob-3"/>
        <div id="rt-particles" style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0}}/>

        {/* BODY */}
        <div style={{flex:1,display:"flex",alignItems:"center",paddingTop:60,paddingBottom:60,position:"relative",zIndex:2}}>
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="rt-badge"><span className="rt-badge-dot"/>Industrial Manufacturing</div>
                <h1 className="rt-headline">Engineering the Future with</h1>
                <div className="rt-dynamic-wrap">
                  <span className={`rt-dynamic${exiting?" exit":""}`}>{MACHINES[machineIdx]}</span>
                </div>
                <p className="rt-subtext">
                  Real Technology Machine Pvt Ltd delivers cutting-edge industrial machines trusted by manufacturers worldwide.
                  From precision crankshaft machines to intelligent robotic cleaning systems — we engineer
                  solutions that drive efficiency and excellence.
                </p>
                <div className="rt-btn-row">
                  <button className="rt-btn-primary">Explore Machines →</button>
                </div>
                <div className="rt-stats" id="rt-stats-anchor">
                  {STATS.map((s,i)=>(
                    <div key={s.label} className="rt-stat">
                      <div className="rt-stat-num">{counters[i]}{s.suffix}</div>
                      <div className="rt-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-6 d-none d-lg-block">
                <div className="rt-collage">
                  <div className="rt-chip rt-chip-1">
                    <span style={{fontSize:"1.3rem"}}>⚙️</span>
                    <div><div>Crankshaft Precision</div><div className="rt-chip-sub">±0.001mm Tolerance</div></div>
                  </div>
                  {/* <div className="rt-chip rt-chip-2">
                    <div className="rt-chip-green"/>
                    <div><div>All Systems Online</div><div className="rt-chip-sub">Live Production Active</div></div>
                  </div> */}
                  {/* <div className="rt-chip rt-chip-3">
                    <span style={{fontSize:"1.3rem"}}>🤖</span>
                    <div><div>Robotic Cleaner</div><div className="rt-chip-sub">AI-Powered</div></div>
                  </div> */}

                  {/* ── REAL MACHINE IMAGES ── */}
                  <div className="rt-img-card rt-card-main">
                    <img src="/images/IndexingBin.jpg" alt="Indexing Bin Cleaning Machine" loading="eager"/>
                    <div className="rt-overlay"/><div className="rt-label"><span>⚙️</span>Indexing Bin Cleaning Machine</div>
                  </div>
                  <div className="rt-img-card rt-card-sec">
                    <img src="/images/Cranshaftcleaningtype.jpg" alt="Cranshaft Machine" loading="eager"/>
                    <div className="rt-overlay"/><div className="rt-label"><span>🏭</span> Cranshaft cleaning type</div>
                  </div>
                  <div className="rt-img-card rt-card-third">
                    <img src="/images/Ultrasonic.png" alt="Robotic Systems" loading="eager"/>
                    <div className="rt-overlay"/><div className="rt-label"><span>🤖</span>Ultrasonic Cleaning Machine</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}