import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";

import NavbarTailwind from "./Pages/NavbarTailwind";
import Footer from "./Footer";

// ✅ Pages
import HeroSlider from "./Pages/HeroSlider";
import HeroMessage from "./Pages/HeroMessage";
import PageSlider from "./Pages/PageSlider";
import CustomerMarquee from "./Pages/CustomerMarquee";
import StatsSection from "./Pages/StatsSection";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import ProductPage from "./Pages/ProductPage";
import ProductDetail from "./Pages/ProductDetail";
import Gallery from "./Pages/Gallery";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Location from "./Pages/Location";
import Support from "./Pages/Support";
import FeedBack from "./Pages/FeedBack";
import Company from "./Pages/Company";

// ✅ Loader component
const Loader = () => (
  <div className="loader-container">
    <img src="/images/Loader.gif" alt="Loading..." className="loader-image" />
    <p className="loader-text">Loading...</p>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  /* --------------------
     ⏳ Handle Loader
  -------------------- */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 🔄 Page Loader on Route Change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, [location]);

  /* --------------------
     🌐 Online / Offline
  -------------------- */
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  /* --------------------
     ⬆️ Back To Top Button
  -------------------- */
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("backToTop");
      if (btn) {
        window.scrollY > 300
          ? btn.classList.add("show-back-to-top")
          : btn.classList.remove("show-back-to-top");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --------------------
     💡 Extra UX Enhancements
  -------------------- */
  const goToContact = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-container">
      {/* 🌀 Loader */}
      {loading && <Loader />}

      {/* 🚫 Offline Banner */}
      {!isOnline && (
        <div className="offline-banner animate-fade-in">
          ⚠️ You’re offline. Some features may not work.
        </div>
      )}

      {/* 🔝 Navbar */}
      <NavbarTailwind />

      {/* 🔀 Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <main style={{ paddingTop: "74px" }}>
              <HeroSlider />
              <HeroMessage />

              <section style={{ marginTop: "30px" }}>
                <PageSlider />
              </section>

              <div
                className="fixed-bg"
                style={{
                  backgroundImage: "url('/images/FixedBg1.jpg')",
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  height: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              />

              <CustomerMarquee />
              <StatsSection />

              {/* Auto-include contact on Home */}
              <section style={{ marginTop: "40px" }}>
                <Contact />
              </section>
            </main>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/location" element={<Location />} />
        <Route path="/support" element={<Support />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/feedback" element={<FeedBack />} />
        <Route path="/company" element={<Company />} />
      </Routes>

      {/* 💬 Floating Contact Button */}
      <button className="floating-contact-button pulse" onClick={goToContact}>
        Contact Us
      </button>

      {/* ⬆️ Back To Top Button */}
      <button
        id="backToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top"
        aria-label="Back to top"
      >
        <ChevronUp size={22} />
      </button>

      {/* 🔻 Footer */}
      <Footer />
    </div>
  );
}

export default App;
