// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductFormModal from "./ProductFormModal";

// function CrudTable({ data, refreshData }) {
//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   // Delete Product
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`);
//       refreshData();
//     } catch (err) {
//       console.error("❌ Error deleting product:", err);
//       alert("Failed to delete product");
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-700">Manage Products</h3>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           onClick={() => {
//             setEditingProduct(null);
//             setShowModal(true);
//           }}
//         >
//           + Add Product
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="py-2 px-4 text-left border-b">Image</th>
//               <th className="py-2 px-4 text-left border-b">Title</th>
//               <th className="py-2 px-4 text-left border-b">Category</th>
//               <th className="py-2 px-4 text-left border-b">Description</th>
//               <th className="py-2 px-4 text-left border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row) => (
//               <tr key={row._id} className="border-b hover:bg-gray-50 transition-colors">
//                 <td className="py-2 px-4">
//                   {row.image ? (
//                     <img
//                       src={row.image}
//                       alt={row.title}
//                       className="h-12 w-12 rounded object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-400 italic">No image</span>
//                   )}
//                 </td>
//                 <td className="py-2 px-4">{row.title}</td>
//                 <td className="py-2 px-4">{row.category}</td>
//                 <td className="py-2 px-4 text-gray-600 truncate max-w-xs">
//                   {row.description || "—"}
//                 </td>
//                 <td className="py-2 px-4">
//                   <button
//                     onClick={() => {
//                       setEditingProduct(row);
//                       setShowModal(true);
//                     }}
//                     className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(row._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <ProductFormModal
//           show={showModal}
//           onClose={() => setShowModal(false)}
//           product={editingProduct}
//           refreshData={refreshData}
//         />
//       )}
//     </div>
//   );
// }

// export default CrudTable;


import React, { useState } from "react";
import axios from "axios";
import { FaPlus, FaPen, FaTrash, FaSpinner, FaImage } from "react-icons/fa";
import ProductFormModal from "./ProductFormModal";

function CrudTable({ data, refreshData }) {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  // Delete Product — same endpoint/method as before
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      refreshData();
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredData = data.filter((row) =>
    [row.title, row.category].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Manage Products
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {filteredData.length} of {data.length} product
            {data.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 sm:w-56"
          />
          <button
            className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
          >
            <FaPlus className="text-xs" />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
      </div>

      {/* Empty state */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 py-14 text-center dark:border-gray-700">
          <FaImage className="mb-3 text-3xl text-gray-300 dark:text-gray-600" />
          <p className="font-medium text-gray-500 dark:text-gray-400">
            No products yet
          </p>
          <p className="mb-4 text-sm text-gray-400 dark:text-gray-500">
            Add your first product to get started
          </p>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowModal(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400 dark:border-gray-700 dark:text-gray-500">
          No products match "{search}"
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700 md:block">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Image</th>
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredData.map((row) => (
                  <tr
                    key={row._id}
                    className="text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-4 py-3">
                      {row.image ? (
                        <img
                          src={row.image}
                          alt={row.title}
                          className="h-11 w-11 rounded-lg border border-gray-100 object-cover dark:border-gray-700"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-500">
                          <FaImage />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {row.title}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {row.category}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-gray-500 dark:text-gray-400">
                      {row.description || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(row);
                            setShowModal(true);
                          }}
                          className="flex items-center gap-1.5 rounded-md bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
                        >
                          <FaPen className="text-[10px]" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row._id)}
                          disabled={deletingId === row._id}
                          className="flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                        >
                          {deletingId === row._id ? (
                            <FaSpinner className="animate-spin text-[10px]" />
                          ) : (
                            <FaTrash className="text-[10px]" />
                          )}
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredData.map((row) => (
              <div
                key={row._id}
                className="rounded-lg border border-gray-100 p-3 dark:border-gray-700"
              >
                <div className="flex gap-3">
                  {row.image ? (
                    <img
                      src={row.image}
                      alt={row.title}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-500">
                      <FaImage />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      {row.title}
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      {row.category}
                    </span>
                    <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                      {row.description || "—"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setEditingProduct(row);
                      setShowModal(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-amber-50 py-1.5 text-xs font-medium text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                  >
                    <FaPen className="text-[10px]" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row._id)}
                    disabled={deletingId === row._id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-red-50 py-1.5 text-xs font-medium text-red-600 disabled:opacity-60 dark:bg-red-500/10 dark:text-red-400"
                  >
                    {deletingId === row._id ? (
                      <FaSpinner className="animate-spin text-[10px]" />
                    ) : (
                      <FaTrash className="text-[10px]" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showModal && (
        <ProductFormModal
          show={showModal}
          onClose={() => setShowModal(false)}
          product={editingProduct}
          refreshData={refreshData}
        />
      )}
    </div>
  );
}

export default CrudTable;