// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// const menuItems = [
//     { title: "Company", link: "/company", submenu: [] },
//     { title: "About", submenu: ["Team", "Company", "Careers"], link: "/about" },
//     {
//         title: "Products",
//         submenu: ["Product 1", "Product 2", "Product 3", "ABCDE"],
//         link: "/product",
//     },
//     {
//         title: "Contact",
//         submenu: [
//             { title: "Locations", link: "/location" },
//             { title: "Support", link: "/support" },
//             { title: "FAQ", link: "/contact#faq" },
//         ],
//         link: "/contact",
//     },
//     {
//         title: "Gallery",
//         submenu: [
//             { title: "Photos", link: "/gallery?tab=photos" },
//             { title: "Videos", link: "/gallery?tab=videos" },
//             { title: "Events", link: "/gallery?tab=events" },
//         ],
//         link: "/gallery",
//     },
//     {
//         title: "More",
//         submenu: [
//             { title: "Partners", link: "/partners" },
//             { title: "Resources", link: "/resources" },
//             { title: "Feedback", link: "/feedback" },
//         ],
//         link: "/feedback",
//     },
// ];

// function NavbarTailwind() {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [openDropdown, setOpenDropdown] = useState(null);

//     const toggleMenu = () => {
//         setMenuOpen((prev) => !prev);
//         setOpenDropdown(null);
//     };

//     const toggleDropdown = (index) => {
//         setOpenDropdown((prev) => (prev === index ? null : index));
//     };

//     // ✅ Google Translate
//     useEffect(() => {
//         const addGoogleTranslateScript = () => {
//             if (!document.querySelector("#google-translate-script")) {
//                 const script = document.createElement("script");
//                 script.id = "google-translate-script";
//                 script.src =
//                     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//                 document.body.appendChild(script);
//             }
//         };

//         window.googleTranslateElementInit = () => {
//             new window.google.translate.TranslateElement(
//                 {
//                     pageLanguage: "en",
//                     includedLanguages: "en,hi,fr,de,es,zh-CN",
//                     layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//                 },
//                 "google_translate_element"
//             );
//         };

//         addGoogleTranslateScript();
//     }, []);

//     return (
//         <nav className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-text-white tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-3 tw-z-50 tw-bg-gradient-to-l tw-from-[rgb(18,95,172)] tw-to-[rgb(145,185,224)]">

//             <Link to="/">
//                 <img src="/images/MainLogo.svg" alt="Logo" className="tw-h-12" />
//             </Link>

//             {/* Hamburger (mobile) */}
//             <button
//                 className="md:tw-hidden tw-text-white tw-text-2xl"
//                 onClick={toggleMenu}
//             >
//                 ☰ 
//             </button>

//             {/* Menu */}
//             {/* Menu */}
//             <ul
//                 className={`tw-list-none tw-flex-col md:tw-flex-row tw-absolute md:tw-static tw-top-16 tw-left-0 tw-w-full md:tw-w-auto tw-bg-blue-800 md:tw-bg-transparent tw-px-6 md:tw-px-0 tw-transition-all tw-duration-300 ${menuOpen
//                         ? "tw-flex tw-space-y-2 md:tw-space-y-0 md:tw-space-x-6"
//                         : "tw-hidden md:tw-flex md:tw-space-x-6"
//                     }`}
//             >

//                 {menuItems.map((item, index) => (
//                     <li
//                         key={index}
//                         className="tw-relative"
//                         onClick={() => window.innerWidth <= 768 && toggleDropdown(index)}
//                     >
//                         {item.link ? (
//                             <Link
//                                 to={item.link}
//                                 className="tw-block tw-py-2 tw-px-3 tw-text-white tw-no-underline hover:tw-text-gray-200"
//                             >
//                                 {item.title}
//                             </Link>
//                         ) : (
//                             <span className="tw-block tw-py-2 tw-px-3 tw-text-white tw-no-underline hover:tw-text-gray-200">
//                                 {item.title}
//                             </span>
//                         )}

//                         {/* Dropdown */}
//                         {item.submenu && item.submenu.length > 0 && (
//                             <ul
//                                 className={`tw-absolute tw-left-0 tw-mt-2 tw-bg-blue-600 tw-rounded tw-shadow-lg tw-min-w-[160px] ${openDropdown === index
//                                         ? "tw-block"
//                                         : "tw-hidden md:group-hover:tw-block"
//                                     }`}
//                             >
//                                 {item.submenu.map((subItem, subIndex) => (
//                                     <li key={subIndex}>
//                                         {typeof subItem === "string" ? (
//                                             <span className="tw-block tw-px-4 tw-py-2 tw-text-white tw-no-underline hover:tw-bg-blue-700">
//                                                 {subItem}
//                                             </span>
//                                         ) : (
//                                             <Link
//                                                 to={subItem.link}
//                                                 className="tw-block tw-px-4 tw-py-2 tw-text-white tw-no-underline hover:tw-bg-blue-700"
//                                             >
//                                                 {subItem.title}
//                                             </Link>
//                                         )}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </li>
//                 ))}

//                 {/* ✅ Translator */}
//                 <li className="tw-flex tw-items-center tw-gap-2 tw-py-2">
//                     <span>🌐</span>
//                     <div id="google_translate_element"></div>
//                 </li>
//             </ul>

//             {/* Social Icons */}
//             <div className="tw-hidden md:tw-flex tw-gap-4 tw-text-xl">
//                 <a
//                     href="https://instagram.com"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="tw-text-white hover:tw-text-gray-200"
//                 >
//                     <i className="fab fa-instagram"></i>
//                 </a>
//                 <a
//                     href="https://facebook.com"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="tw-text-white hover:tw-text-gray-200"
//                 >
//                     <i className="fab fa-facebook"></i>
//                 </a>
//                 <a
//                     href="https://wa.me/1234567890"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="tw-text-white hover:tw-text-gray-200"
//                 >
//                     <i className="fab fa-whatsapp"></i>
//                 </a>
//             </div>
//         </nav>
//     );

// }
// export default NavbarTailwind;

import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

const menuItems = [
    { title: "Company", link: "/company" },
    { title: "About", link: "/about" },
    { title: "Products", link: "/product" },
    { title: "Contact", link: "/contact" },
    { title: "Gallery", link: "/gallery" },
    {
        title: "More",
        link: "#",
        submenu: [
            { title: "📍 Location", link: "/location" },
            { title: "💬 Feedback", link: "/feedback" },
        ],
    },
];

function NavbarTailwind() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const moreRef = useRef(null);
    const navRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
        setMoreOpen(false);
    };

    // Close More dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (moreRef.current && !moreRef.current.contains(e.target)) {
                setMoreOpen(false);
            }
            if (navRef.current && !navRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Close on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
                setMoreOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Google Translate
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
        <nav
            ref={navRef}
            className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-z-50 tw-bg-gradient-to-l tw-from-[rgb(18,95,172)] tw-to-[rgb(145,185,224)] tw-shadow-lg"
        >
            {/* ─── Main bar ─── */}
            <div className="tw-flex tw-items-center tw-justify-between tw-px-4 md:tw-px-8 tw-py-3">

                {/* Logo */}
                <Link to="/" onClick={() => { setMenuOpen(false); setMoreOpen(false); }}>
                    <img src="/images/MainLogo.svg" alt="Logo" className="tw-h-10 md:tw-h-12" />
                </Link>

                {/* ── Desktop menu ── */}
                <ul className="tw-hidden md:tw-flex tw-list-none tw-items-center tw-gap-1 tw-m-0 tw-p-0">
                    {menuItems.map((item, index) => (
                        item.submenu ? (
                            /* More tab — dropdown only here */
                            <li key={index} className="tw-relative" ref={moreRef}>
                                <button
                                    onClick={() => setMoreOpen((p) => !p)}
                                    className="tw-flex tw-items-center tw-gap-1 tw-py-2 tw-px-3 tw-text-white tw-text-sm tw-font-medium tw-rounded-md hover:tw-bg-white/15 tw-transition-all tw-duration-200 tw-border-0 tw-bg-transparent tw-cursor-pointer"
                                >
                                    {item.title}
                                    <svg
                                        className={`tw-w-3.5 tw-h-3.5 tw-transition-transform tw-duration-200 ${moreOpen ? "tw-rotate-180" : ""}`}
                                        fill="currentColor" viewBox="0 0 20 20"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {/* Desktop Dropdown */}
                                {moreOpen && (
                                    <ul className="tw-absolute tw-top-full tw-right-0 tw-mt-2 tw-bg-white tw-rounded-xl tw-shadow-2xl tw-min-w-[180px] tw-list-none tw-p-2 tw-z-50 tw-border tw-border-blue-100 tw-animate-[fadeIn_0.15s_ease]">
                                        {item.submenu.map((sub, si) => (
                                            <li key={si}>
                                                <Link
                                                    to={sub.link}
                                                    onClick={() => setMoreOpen(false)}
                                                    className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2.5 tw-text-gray-700 tw-text-sm tw-font-medium tw-no-underline tw-rounded-lg hover:tw-bg-blue-50 hover:tw-text-blue-700 tw-transition-colors tw-duration-150"
                                                >
                                                    {sub.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ) : (
                            /* All other tabs — plain links, no dropdown */
                            <li key={index}>
                                <Link
                                    to={item.link}
                                    className="tw-block tw-py-2 tw-px-3 tw-text-white tw-text-sm tw-font-medium tw-no-underline tw-rounded-md hover:tw-bg-white/15 tw-transition-all tw-duration-200"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        )
                    ))}

                    {/* Translator */}
                    <li className="tw-flex tw-items-center tw-gap-1.5 tw-px-2">
                        <span className="tw-text-base">🌐</span>
                        <div id="google_translate_element" className="tw-text-sm"></div>
                    </li>
                </ul>

                {/* Desktop Social Icons */}
                <div className="tw-hidden md:tw-flex tw-gap-3 tw-text-lg tw-items-center">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"
                        className="tw-text-white hover:tw-text-pink-200 tw-transition-colors tw-duration-200">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"
                        className="tw-text-white hover:tw-text-blue-200 tw-transition-colors tw-duration-200">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer"
                        className="tw-text-white hover:tw-text-green-200 tw-transition-colors tw-duration-200">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                </div>

                {/* ── Animated Hamburger (mobile) ── */}
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    className="md:tw-hidden tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-10 tw-h-10 tw-rounded-xl hover:tw-bg-white/15 tw-transition-colors tw-duration-200 tw-border-0 tw-bg-transparent tw-cursor-pointer tw-gap-[5px]"
                >
                    <span className={`tw-block tw-h-[2px] tw-bg-white tw-rounded-full tw-transition-all tw-duration-300 ${menuOpen ? "tw-w-6 tw-rotate-45 tw-translate-y-[7px]" : "tw-w-6"}`} />
                    <span className={`tw-block tw-h-[2px] tw-bg-white tw-rounded-full tw-transition-all tw-duration-200 tw-w-5 ${menuOpen ? "tw-opacity-0 tw-scale-x-0" : "tw-opacity-100"}`} />
                    <span className={`tw-block tw-h-[2px] tw-bg-white tw-rounded-full tw-transition-all tw-duration-300 ${menuOpen ? "tw-w-6 -tw-rotate-45 -tw-translate-y-[7px]" : "tw-w-4"}`} />
                </button>
            </div>

            {/* ─── Mobile Drawer ─── */}
            <div
                className={`md:tw-hidden tw-transition-all tw-duration-300 tw-ease-in-out tw-overflow-hidden ${menuOpen ? "tw-max-h-[500px] tw-opacity-100" : "tw-max-h-0 tw-opacity-0"}`}
            >
                <div className="tw-bg-[rgb(10,55,120)] tw-border-t tw-border-white/10 tw-px-3 tw-pt-2 tw-pb-5">

                    {/* Nav links */}
                    <ul className="tw-list-none tw-m-0 tw-p-0 tw-mt-1 tw-space-y-0.5">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.submenu ? (
                                    /* More — expandable */
                                    <div>
                                        <button
                                            onClick={() => setMoreOpen((p) => !p)}
                                            className="tw-w-full tw-flex tw-items-center tw-justify-between tw-py-3 tw-px-4 tw-text-white tw-text-sm tw-font-semibold tw-rounded-xl hover:tw-bg-white/10 tw-transition-colors tw-duration-200 tw-border-0 tw-bg-transparent tw-cursor-pointer"
                                        >
                                            <span className="tw-flex tw-items-center tw-gap-3">
                                                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-300 tw-flex-shrink-0"></span>
                                                {item.title}
                                            </span>
                                            <span className={`tw-text-blue-200 tw-text-xs tw-transition-transform tw-duration-200 ${moreOpen ? "tw-rotate-180" : ""}`}>
                                                <svg className="tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>

                                        {/* Mobile More submenu */}
                                        <div className={`tw-overflow-hidden tw-transition-all tw-duration-300 ${moreOpen ? "tw-max-h-40" : "tw-max-h-0"}`}>
                                            <ul className="tw-list-none tw-m-0 tw-p-0 tw-ml-5 tw-mb-2 tw-mt-0.5 tw-border-l-2 tw-border-blue-400/40 tw-pl-3 tw-space-y-0.5">
                                                {item.submenu.map((sub, si) => (
                                                    <li key={si}>
                                                        <Link
                                                            to={sub.link}
                                                            onClick={() => { setMenuOpen(false); setMoreOpen(false); }}
                                                            className="tw-block tw-py-2.5 tw-px-3 tw-text-blue-100 tw-text-sm tw-no-underline hover:tw-text-white hover:tw-bg-white/10 tw-rounded-lg tw-transition-colors tw-duration-150"
                                                        >
                                                            {sub.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    /* Regular plain link */
                                    <Link
                                        to={item.link}
                                        onClick={() => setMenuOpen(false)}
                                        className="tw-flex tw-items-center tw-gap-3 tw-py-3 tw-px-4 tw-text-white tw-text-sm tw-font-semibold tw-no-underline tw-rounded-xl hover:tw-bg-white/10 tw-transition-colors tw-duration-200"
                                    >
                                        <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-blue-300 tw-flex-shrink-0"></span>
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Divider */}
                    <div className="tw-border-t tw-border-white/10 tw-my-3 tw-mx-2" />

                    {/* Bottom: socials + translator */}
                    <div className="tw-flex tw-items-center tw-justify-between tw-px-4">
                        <div className="tw-flex tw-gap-5 tw-text-xl tw-items-center">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer"
                                className="tw-text-white hover:tw-text-pink-200 tw-transition-colors">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer"
                                className="tw-text-white hover:tw-text-blue-200 tw-transition-colors">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer"
                                className="tw-text-white hover:tw-text-green-200 tw-transition-colors">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                        <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-white tw-text-sm">
                            <span>🌐</span>
                            <div id="google_translate_element_mobile"></div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default NavbarTailwind;