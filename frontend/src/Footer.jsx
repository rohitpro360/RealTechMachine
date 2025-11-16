import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="tw-bg-[#1a4e64] tw-text-white tw-py-12 tw-px-6">
      <div className="tw-max-w-6xl tw-mx-auto tw-grid md:tw-grid-cols-3 tw-gap-8">
        {/* Company Info */}
        <div>
          <h5 className="tw-text-lg tw-font-semibold tw-mb-4">
            Real Technology Pvt. Ltd.
          </h5>
          <p className="tw-text-sm tw-leading-relaxed tw-opacity-90">
            Your trusted partner for innovation, engineering excellence,
            and sustainable growth.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="tw-text-lg tw-font-semibold tw-mb-4">Quick Links</h5>
          <ul className="tw-space-y-2" >
            <li>
              <Link
                to="/"
                className="tw-text-white hover:tw-text-blue-300 tw-no-underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="tw-text-white hover:tw-text-blue-300 tw-no-underline"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="tw-text-white hover:tw-text-blue-300 tw-no-underline"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="tw-text-white hover:tw-text-blue-300 tw-no-underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h5 className="tw-text-lg tw-font-semibold tw-mb-4">Follow Us</h5>
          <div className="tw-flex tw-gap-4 tw-text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:tw-text-blue-400"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:tw-text-pink-400"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="hover:tw-text-green-400"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:tw-text-blue-300"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="tw-border-gray-500 tw-my-8" />

      {/* Copyright */}
      <p className="tw-text-center tw-text-sm tw-opacity-80">
        &copy; {new Date().getFullYear()} Real Technologies Pvt. Ltd. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
