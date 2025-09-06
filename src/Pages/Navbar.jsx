// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const menuItems = [
  { title: 'Company', submenu: ['Subhome 1', 'Subhome 2', 'Subhome 3'] },
  { title: 'About', submenu: ['Team', 'Company', 'Careers'], link: '/about' },
  { title: 'Services', submenu: ['Design', 'Development', 'Marketing'] },
  { title: 'Products', submenu: ['Product 1', 'Product 2', 'Product 3','ABCDE'], link: '/Product' },
  { title: 'Blog', submenu: ['Latest', 'Tutorials', 'News'] },
  { title: 'Contact', submenu: ['Locations', 'Support', 'FAQ'], link: '/contact' },
  { title: 'Gallery', submenu: ['Photos', 'Videos', 'Events'] },
  { title: 'More', submenu: ['Partners', 'Resources', 'Feedback'] },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MySite</div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`navbar-item ${openDropdown === index ? 'open' : ''}`}
            onClick={() => {
              if (window.innerWidth <= 768) toggleDropdown(index);
            }}
          >
            {item.link ? (
              <Link to={item.link} className="navbar-link">{item.title}</Link>
            ) : (
              <a href="#!" className="navbar-link">{item.title}</a>
            )}
            <ul className="dropdown">
              {item.submenu.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <a href="#" className="dropdown-link">{subItem}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
