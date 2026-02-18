import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="tw-bg-gradient-to-b tw-from-[#0f3550] tw-to-[#0a2236] tw-text-white">

      {/* ── Top CTA Strip ── */}
      <div className="tw-bg-gradient-to-r tw-from-[rgb(18,95,172)] tw-to-[rgb(145,185,224)] tw-py-5 tw-px-6">
        <div className="tw-max-w-6xl tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-gap-4">
          <p className="tw-text-white tw-font-semibold tw-text-base md:tw-text-lg tw-m-0">
            🚀 Ready to take your manufacturing to the next level?
          </p>
          <Link
            to="/contact"
            className="tw-bg-white tw-text-[rgb(18,95,172)] tw-font-bold tw-text-sm tw-px-6 tw-py-2.5 tw-rounded-full hover:tw-bg-blue-50 tw-transition-colors tw-no-underline tw-whitespace-nowrap tw-shadow-md"
          >
            Get in Touch →
          </Link>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="tw-max-w-6xl tw-mx-auto tw-px-6 tw-py-12">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-10">

          {/* ── Col 1: Brand ── */}
          <div className="lg:tw-col-span-1">
            <img
              src="/images/MainLogo.svg"
              alt="Real Technology Logo"
              className="tw-h-12 tw-mb-4"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <h5 className="tw-text-white tw-font-bold tw-text-base tw-mb-3">
              Real Technology Pvt. Ltd.
            </h5>
            <p className="tw-text-blue-200/80 tw-text-sm tw-leading-relaxed tw-mb-5">
              Your trusted partner for innovation, engineering excellence,
              and sustainable industrial growth.
            </p>
            {/* Social Icons */}
            <div className="tw-flex tw-gap-3">
              {[
                { href: "https://facebook.com",  icon: "fa-facebook",  hover: "hover:tw-bg-blue-600"  },
                { href: "https://instagram.com", icon: "fa-instagram", hover: "hover:tw-bg-pink-600"  },
                { href: "https://wa.me/1234567890", icon: "fa-whatsapp", hover: "hover:tw-bg-green-600" },
                { href: "https://linkedin.com",  icon: "fa-linkedin",  hover: "hover:tw-bg-blue-700"  },
              ].map(({ href, icon, hover }) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`tw-w-9 tw-h-9 tw-rounded-lg tw-bg-white/10 tw-flex tw-items-center tw-justify-center tw-text-white tw-transition-all tw-duration-200 ${hover} hover:tw-scale-110`}
                >
                  <i className={`fab ${icon} tw-text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h5 className="tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-mb-5 tw-flex tw-items-center tw-gap-2">
              <span className="tw-w-5 tw-h-0.5 tw-bg-blue-400 tw-inline-block"></span>
              Quick Links
            </h5>
            <ul className="tw-space-y-2.5 tw-list-none tw-p-0 tw-m-0">
              {[
                { label: "Home",     to: "/"        },
                { label: "About",    to: "/about"   },
                { label: "Products", to: "/product" },
                { label: "Gallery",  to: "/gallery" },
                { label: "Contact",  to: "/contact" },
                { label: "Feedback", to: "/feedback"},
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="tw-text-blue-200/80 hover:tw-text-white tw-text-sm tw-no-underline tw-flex tw-items-center tw-gap-2 tw-transition-colors tw-duration-150 tw-group"
                  >
                    <svg className="tw-w-3 tw-h-3 tw-text-blue-400 group-hover:tw-translate-x-0.5 tw-transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Products ── */}
          <div>
            <h5 className="tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-mb-5 tw-flex tw-items-center tw-gap-2">
              <span className="tw-w-5 tw-h-0.5 tw-bg-blue-400 tw-inline-block"></span>
              Our Products
            </h5>
            <ul className="tw-space-y-2.5 tw-list-none tw-p-0 tw-m-0">
              {[
                "Crankshaft Machines",
                "Robotic Cleaning Machines",
                "CNC Precision Tools",
                "Ultrasonic Cleaners",
                "Industrial Automation",
              ].map((product) => (
                <li key={product}>
                  <Link
                    to="/product"
                    className="tw-text-blue-200/80 hover:tw-text-white tw-text-sm tw-no-underline tw-flex tw-items-center tw-gap-2 tw-transition-colors tw-duration-150 tw-group"
                  >
                    <svg className="tw-w-3 tw-h-3 tw-text-blue-400 group-hover:tw-translate-x-0.5 tw-transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact Info ── */}
          <div>
            <h5 className="tw-text-white tw-font-bold tw-text-sm tw-uppercase tw-tracking-widest tw-mb-5 tw-flex tw-items-center tw-gap-2">
              <span className="tw-w-5 tw-h-0.5 tw-bg-blue-400 tw-inline-block"></span>
              Contact Us
            </h5>
            <ul className="tw-space-y-4 tw-list-none tw-p-0 tw-m-0">

              {/* Address */}
              <li className="tw-flex tw-items-start tw-gap-3">
                <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-white/10 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-mt-0.5">
                  <svg className="tw-w-4 tw-h-4 tw-text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="tw-text-blue-100 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-mb-0.5 tw-m-0">Address</p>
                  <p className="tw-text-blue-200/80 tw-text-sm tw-leading-relaxed tw-m-0">
                    Gat No. 123, MIDC Industrial Area,<br />
                    Pune, Maharashtra – 411026
                  </p>
                </div>
              </li>

              {/* Phone */}
              <li className="tw-flex tw-items-start tw-gap-3">
                <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-white/10 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                  <svg className="tw-w-4 tw-h-4 tw-text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="tw-text-blue-100 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-mb-0.5 tw-m-0">Phone</p>
                  <a href="tel:+911234567890" className="tw-text-blue-200/80 hover:tw-text-white tw-text-sm tw-no-underline tw-transition-colors tw-block">
                    +91 12345 67890
                  </a>
                  <a href="tel:+919876543210" className="tw-text-blue-200/80 hover:tw-text-white tw-text-sm tw-no-underline tw-transition-colors tw-block">
                    +91 98765 43210
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="tw-flex tw-items-start tw-gap-3">
                <div className="tw-w-8 tw-h-8 tw-rounded-lg tw-bg-white/10 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                  <svg className="tw-w-4 tw-h-4 tw-text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="tw-text-blue-100 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-mb-0.5 tw-m-0">Email</p>
                  <a href="mailto:info@realtechnology.in" className="tw-text-blue-200/80 hover:tw-text-white tw-text-sm tw-no-underline tw-transition-colors tw-block">
                    info@realtechnology.in
                  </a>
                  <a href="mailto:sales@realtechnology.in" className="tw-text-blue-200/80 hover:tw-text-white tw-text-sm tw-no-underline tw-transition-colors tw-block">
                    sales@realtechnology.in
                  </a>
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="tw-max-w-6xl tw-mx-auto tw-px-6">
        <div className="tw-border-t tw-border-white/10"></div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="tw-max-w-6xl tw-mx-auto tw-px-6 tw-py-5">
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-gap-3">
          <p className="tw-text-blue-200/60 tw-text-sm tw-m-0">
            &copy; {new Date().getFullYear()} Real Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="tw-flex tw-gap-5">
            <Link to="/privacy" className="tw-text-blue-200/60 hover:tw-text-white tw-text-xs tw-no-underline tw-transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="tw-text-blue-200/60 hover:tw-text-white tw-text-xs tw-no-underline tw-transition-colors">Terms of Use</Link>
            <Link to="/sitemap" className="tw-text-blue-200/60 hover:tw-text-white tw-text-xs tw-no-underline tw-transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;