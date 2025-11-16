import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
        link: "/feedback",
    },
];

function NavbarTailwind() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    // ✅ Google Translate
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
                    includedLanguages: "en,hi,fr,de,es,zh-CN",
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                "google_translate_element"
            );
        };

        addGoogleTranslateScript();
    }, []);

    return (
        <nav className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-text-white tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-3 tw-z-50 tw-bg-gradient-to-l tw-from-[rgb(18,95,172)] tw-to-[rgb(145,185,224)]">

            <Link to="/">
                <img src="/images/MainLogo.svg" alt="Logo" className="tw-h-12" />
            </Link>

            {/* Hamburger (mobile) */}
            <button
                className="md:tw-hidden tw-text-white tw-text-2xl"
                onClick={toggleMenu}
            >
                ☰
            </button>

            {/* Menu */}
            {/* Menu */}
            <ul
                className={`tw-list-none tw-flex-col md:tw-flex-row tw-absolute md:tw-static tw-top-16 tw-left-0 tw-w-full md:tw-w-auto tw-bg-blue-800 md:tw-bg-transparent tw-px-6 md:tw-px-0 tw-transition-all tw-duration-300 ${menuOpen
                        ? "tw-flex tw-space-y-2 md:tw-space-y-0 md:tw-space-x-6"
                        : "tw-hidden md:tw-flex md:tw-space-x-6"
                    }`}
            >

                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="tw-relative"
                        onClick={() => window.innerWidth <= 768 && toggleDropdown(index)}
                    >
                        {item.link ? (
                            <Link
                                to={item.link}
                                className="tw-block tw-py-2 tw-px-3 tw-text-white tw-no-underline hover:tw-text-gray-200"
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <span className="tw-block tw-py-2 tw-px-3 tw-text-white tw-no-underline hover:tw-text-gray-200">
                                {item.title}
                            </span>
                        )}

                        {/* Dropdown */}
                        {item.submenu && item.submenu.length > 0 && (
                            <ul
                                className={`tw-absolute tw-left-0 tw-mt-2 tw-bg-blue-600 tw-rounded tw-shadow-lg tw-min-w-[160px] ${openDropdown === index
                                        ? "tw-block"
                                        : "tw-hidden md:group-hover:tw-block"
                                    }`}
                            >
                                {item.submenu.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                        {typeof subItem === "string" ? (
                                            <span className="tw-block tw-px-4 tw-py-2 tw-text-white tw-no-underline hover:tw-bg-blue-700">
                                                {subItem}
                                            </span>
                                        ) : (
                                            <Link
                                                to={subItem.link}
                                                className="tw-block tw-px-4 tw-py-2 tw-text-white tw-no-underline hover:tw-bg-blue-700"
                                            >
                                                {subItem.title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}

                {/* ✅ Translator */}
                <li className="tw-flex tw-items-center tw-gap-2 tw-py-2">
                    <span>🌐</span>
                    <div id="google_translate_element"></div>
                </li>
            </ul>

            {/* Social Icons */}
            <div className="tw-hidden md:tw-flex tw-gap-4 tw-text-xl">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="tw-text-white hover:tw-text-gray-200"
                >
                    <i className="fab fa-instagram"></i>
                </a>
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="tw-text-white hover:tw-text-gray-200"
                >
                    <i className="fab fa-facebook"></i>
                </a>
                <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="tw-text-white hover:tw-text-gray-200"
                >
                    <i className="fab fa-whatsapp"></i>
                </a>
            </div>
        </nav>
    );
}

export default NavbarTailwind;
