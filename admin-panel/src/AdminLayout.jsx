// import React, { useState, useEffect } from "react";
// import Sidebar from "./component/Sidebar";
// import Topbar from "./component/Topbar";
// import Dashboard from "./Dashboard";
// import CrudTable from "./CrudTable";
// import EmailsPage from "./Emails";
// import Reports from "./Reports";
// import GalleryAdmin from "./GalleryAdmin"; // Gallery page import

// function AdminLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState("dashboard");
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const renderContent = () => {
//     switch (currentPage) {
//       case "dashboard":
//         return <Dashboard />;

//       case "products":
//         return (
//           <div className="p-4 sm:p-6">
//             <h2 className="text-2xl font-bold mb-4 pl-8">🛒 Products</h2>
//             <CrudTable />
//           </div>
//         );

//       case "gallery":
//         return (
//           <div className="p-4 sm:p-6">
//             <h2 className="text-2xl font-bold mb-4 pl-8">📸 Gallery</h2>
//             <GalleryAdmin />
//           </div>
//         );

//       case "emails":
//         return <EmailsPage />;

//       case "reports":
//         return <Reports />;

//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
//       {/* Sidebar */}
//       <Sidebar
//         open={sidebarOpen}
//         setOpen={setSidebarOpen}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//       />

//       {/* Main layout */}
//       <div className="flex flex-col flex-1 h-screen overflow-hidden">
//         <Topbar
//           setSidebarOpen={setSidebarOpen}
//           theme={theme}
//           setTheme={setTheme}
//         />

//         {/* Main scrollable content */}
//         <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "./component/Sidebar";
import Topbar from "./component/Topbar";
import Dashboard from "./Dashboard";
import CrudTable from "./CrudTable";
import EmailsPage from "./Emails";
import Reports from "./Reports";
import GalleryAdmin from "./GalleryAdmin";

const PAGE_META = {
  dashboard: { title: null, icon: null },
  products: { title: "Products", icon: "🛒" },
  gallery: { title: "Gallery", icon: "📸" },
  emails: { title: null, icon: null },
  reports: { title: null, icon: null },
};

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close sidebar on Escape (nice touch for mobile overlay UX)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSetPage = useCallback((page) => {
    setCurrentPage(page);
    setSidebarOpen(false); // auto-close on mobile after navigation
  }, []);

  const pageBody = useMemo(() => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <CrudTable />;
      case "gallery":
        return <GalleryAdmin />;
      case "emails":
        return <EmailsPage />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  }, [currentPage]);

  const meta = PAGE_META[currentPage] || {};

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={handleSetPage}
      />

      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main layout */}
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Topbar
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 text-gray-800 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">
          <div
            key={currentPage}
            className="animate-in fade-in slide-in-from-bottom-1 mx-auto max-w-7xl p-4 duration-300 sm:p-6 lg:p-8"
          >
            {meta.title && (
              <div className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-4 dark:border-gray-800">
                {meta.icon && <span className="text-2xl">{meta.icon}</span>}
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {meta.title}
                </h2>
              </div>
            )}
            {pageBody}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
