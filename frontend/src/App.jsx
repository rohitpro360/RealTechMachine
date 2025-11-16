
import React, { useState, useEffect } from "react";
import './App.css';
import Footer from "./Footer";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import HeroSlider from "./Pages/HeroSlider";
import PageSlider from "./Pages/PageSlider";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTailwind from "./Pages/NavbarTailwind";
import CustomerMarquee from "./Pages/CustomerMarquee";
import ProductPage from "./Pages/ProductPage";
import ProductDetail from "./Pages/ProductDetail";
import Gallery from "./Pages/Gallery";
import HeroMessage from "./Pages/HeroMessage";
// import Login from "./Pages/Login";
// import Admin from "./Pages/Admin";
import Location from "./Pages/Location";
import Support from "./Pages/Support";
import FeedBack from "./Pages/FeedBack";
import Company from "./Pages/Company";
import { ChevronUp } from "lucide-react";
import StatsSection from "./Pages/StatsSection";


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

  // ✅ Initial loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Loader on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  // ✅ Online/offline handling
  useEffect(() => {
    const goOffline = () => setIsOnline(false);
    const goOnline = () => setIsOnline(true);

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  //button for bottom to top

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
    <div className="app-container">
      {loading && <Loader />}
      {!isOnline && <div className="offline-banner">⚠️ You are offline</div>}

      {/* ✅ Navbar */}
      {/* <Navbar /> */}
      <NavbarTailwind />

      {/* ✅ Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ paddingTop: '74px' }}>
              <HeroSlider />

              <HeroMessage />

              <div style={{ marginTop: '30px' }}>
                <PageSlider />
              </div>

              <div
                style={{
                  backgroundImage: "url('/images/FixedBg1.jpg')",
                  backgroundAttachment: 'fixed',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  height: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40px'
                }}
              />

              <CustomerMarquee />

              <StatsSection />

              {location.pathname !== '/contact' && (
                <div style={{ marginTop: '30px' }}>
                  <Contact />

                </div>
              )}
            </div>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/location" element={<Location />} />
        <Route path="/support" element={<Support />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/feedback" element={<FeedBack />} />
        <Route path="/company" element={<Company />} />

      </Routes>

      <button
        className="floating-contact-button"
        onClick={() => navigate('/contact')}
      >
        Contact Us
      </button>
      {/* Back to Top Button */}
      <button
        id="backToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="back-to-top"
      >
        <ChevronUp size={24} />
      </button>

      <Footer />
    </div>
  );
}

export default App;
