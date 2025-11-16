

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";

const menuItems = [
  { title: "Company", link: "/company", submenu: [] },
  { title: "About", submenu: ["Team", "Company", "Careers"], link: "/about" },
  {
    title: "Products",
    submenu: ["Product 1", "Product 2", "Product 3", "ABCDE"],
    link: "/product",
  },
  {
    title: "Contact",
    submenu: [
      { title: "Locations", link: "/location" },
      { title: "Support", link: "/support" },
      { title: "FAQ", link: "/contact#faq" },
    ],
    link: "/contact",
  },
  {
    title: "Gallery",
    submenu: [
      { title: "Photos", link: "/gallery?tab=photos" },
      { title: "Videos", link: "/gallery?tab=videos" },
      { title: "Events", link: "/gallery?tab=events" },
    ],
    link: "/gallery",
  },
  {
    title: "More",
    submenu: [
      { title: "Partners", link: "/partners" },
      { title: "Resources", link: "/resources" },
      { title: "Feedback", link: "/feedback" },
    ],
  },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  // ✅ Load Google Translate script only once
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,fr,de,es,zh-CN", // ✅ add more if needed
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/MainLogo.svg" alt="Logo" className="logo-img" />
        </Link>
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Menu */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`navbar-item ${openDropdown === index ? "open" : ""}`}
            onClick={() => {
              if (window.innerWidth <= 768) toggleDropdown(index);
            }}
          >
            {item.link ? (
              <Link to={item.link} className="navbar-link">
                {item.title}
              </Link>
            ) : (
              <span className="navbar-link">{item.title}</span>
            )}

            {/* Dropdown */}
            {item.submenu && item.submenu.length > 0 && (
              <ul className="dropdown" aria-label={`${item.title} submenu`}>
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    {typeof subItem === "string" ? (
                      <span className="dropdown-link">{subItem}</span>
                    ) : (
                      <Link to={subItem.link} className="dropdown-link">
                        {subItem.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

       {/* ✅ Translator Menu Item */}
<li className="navbar-item translator-container">
  <div className="translator-wrapper">
    <span className="translator-icon">
      <svg xmlns="http://www.w3.org/2000/svg" 
           width="18" height="18" 
           viewBox="0 0 24 24" 
           fill="none" stroke="currentColor" 
           strokeWidth="2" strokeLinecap="round" 
           strokeLinejoin="round" 
           className="lucide lucide-globe">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    </span>
    <div id="google_translate_element"></div>
  </div>
</li>

      </ul>

      {/* Social Icons */}
      <div className="social-icons">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;








