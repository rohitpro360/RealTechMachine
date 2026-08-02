// import React, { useState } from "react";
// import {
//   FaTachometerAlt,
//   FaBox,
//   FaEnvelope,
//   FaChartPie,
//   FaChevronLeft,
//   FaChevronRight,
//   FaImages, // ✅ NEW ICON FOR GALLERY
// } from "react-icons/fa";

// export default function Sidebar({ open, setOpen, currentPage, setCurrentPage }) {
//   const [collapsed, setCollapsed] = useState(false);

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
//     { name: "Products", icon: <FaBox />, key: "products" },
//     { name: "Gallery", icon: <FaImages />, key: "gallery" }, // ✅ ADDED HERE
//     { name: "Emails", icon: <FaEnvelope />, key: "emails" },
//     { name: "Reports", icon: <FaChartPie />, key: "reports" },
//   ];

//   return (
//     <>
//       {/* Overlay for Mobile */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 md:hidden"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}

//       <aside
//         className={`fixed md:static top-0 left-0 h-screen flex flex-col bg-gray-800 text-gray-100 z-40
//           transform transition-all duration-300 ease-in-out shadow-lg
//           ${open ? "translate-x-0" : "-translate-x-full"}
//           ${collapsed ? "md:w-20" : "md:w-64"}
//           md:translate-x-0`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-5 border-b border-gray-700">
//           {!collapsed && <h2 className="text-2xl font-bold">RealTech</h2>}
//           <button
//             onClick={() =>
//               window.innerWidth < 768
//                 ? setOpen(false)
//                 : setCollapsed(!collapsed)
//             }
//             className="text-gray-400 hover:text-white text-lg"
//           >
//             {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
//           </button>
//         </div>

//         {/* Nav Links */}
//         <nav className="flex-1 overflow-y-auto mt-4 space-y-1 px-2 custom-scrollbar">
//           {menuItems.map((item) => (
//             <button
//               key={item.key}
//               onClick={() => {
//                 setCurrentPage(item.key);
//                 setOpen(false);
//               }}
//               className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg transition-colors duration-200
//                 ${
//                   currentPage === item.key
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-700 text-gray-300"
//                 }
//                 ${collapsed ? "justify-center" : ""}
//               `}
//             >
//               <span className="text-lg">{item.icon}</span>
//               {!collapsed && <span>{item.name}</span>}
//             </button>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-400">
//           {!collapsed && "© 2025 RealTech"}
//         </div>
//       </aside>
//     </>
//   );
// }


import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaEnvelope,
  FaChartPie,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
} from "react-icons/fa";

export default function Sidebar({ open, setOpen, currentPage, setCurrentPage }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
    { name: "Products", icon: <FaBox />, key: "products" },
    { name: "Gallery", icon: <FaImages />, key: "gallery" },
    { name: "Emails", icon: <FaEnvelope />, key: "emails" },
    { name: "Reports", icon: <FaChartPie />, key: "reports" },
  ];

  return (
    <>
      {/* Overlay for Mobile — matches AdminLayout's lg breakpoint */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col
          border-r border-gray-200 bg-white text-gray-700 shadow-lg
          transition-all duration-300 ease-in-out
          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          lg:static lg:translate-x-0`}
      >
        {/* Header / Brand */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          {!collapsed && (
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
                R
              </span>
              RealTech
            </h2>
          )}
          <button
            onClick={() =>
              window.innerWidth < 1024
                ? setOpen(false)
                : setCollapsed(!collapsed)
            }
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="custom-scrollbar mt-4 flex-1 space-y-1 overflow-y-auto px-3">
          {menuItems.map((item) => {
            const isActive = currentPage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  setOpen(false);
                }}
                title={collapsed ? item.name : undefined}
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                {isActive && !collapsed && (
                  <span className="absolute left-0 h-5 w-1 rounded-r-full bg-white/80" />
                )}
                <span className="text-base">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}

                {/* Tooltip when collapsed (desktop only) */}
                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 lg:block">
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 text-center text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
          {!collapsed ? "© 2025 RealTech" : "©"}
        </div>
      </aside>
    </>
  );
}