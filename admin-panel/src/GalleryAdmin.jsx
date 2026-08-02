import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaPen,
  FaTrash,
  FaSpinner,
  FaImage,
  FaVideo,
  FaCalendarAlt,
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";

const TYPE_ICON = {
  photo: <FaImage />,
  video: <FaVideo />,
  event: <FaCalendarAlt />,
};

function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    type: "photo", // photo | video | event
    category: "office",
    imageUrl: "",
    videoUrl: "",
    title: "",
    description: "",
  });

  /* ------------------ LOAD GALLERY ------------------ */
  const loadGallery = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  /* ------------------ IMAGE UPLOAD (Cloudinary) ------------------ */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);

    setUploading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/gallery/upload", fd);
      setForm({ ...form, imageUrl: res.data.imageUrl });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () =>
    setForm({
      type: "photo",
      category: "office",
      imageUrl: "",
      videoUrl: "",
      title: "",
      description: "",
    });

  /* ------------------ ADD / UPDATE ------------------ */
  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/gallery/${editing._id}`, form);
      } else {
        await axios.post("http://localhost:5000/api/gallery", form);
      }

      resetForm();
      setShowForm(false);
      setEditing(null);
      loadGallery();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save gallery item");
    } finally {
      setSaving(false);
    }
  };

  /* ------------------ DELETE ------------------ */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      loadGallery();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete item");
    } finally {
      setDeletingId(null);
    }
  };

  /* ------------------ EDIT ------------------ */
  const handleEdit = (item) => {
    setEditing(item);
    setForm(item);
    setShowForm(true);
  };

  const inputClasses =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200";

  return (
    <div>
      {/* HEADER */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Manage Gallery
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          onClick={() => {
            setEditing(null);
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus className="text-xs" /> Add Item
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {editing ? "Edit Gallery Item" : "Add New Gallery Item"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              aria-label="Close form"
            >
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* TYPE */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Type
              </label>
              <select
                className={inputClasses}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
                <option value="event">Event</option>
              </select>
            </div>

            {/* CATEGORY */}
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Category
              </label>
              <select
                className={inputClasses}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="office">Office</option>
                <option value="events">Events</option>
                <option value="factory">Factory</option>
                <option value="staff">Staff</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* PHOTO */}
            {form.type === "photo" && (
              <div className="col-span-1 sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  Image
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm text-gray-500 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-400">
                    {uploading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaCloudUploadAlt />
                    )}
                    {uploading ? "Uploading..." : "Choose file"}
                    <input
                      type="file"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>

                  {form.imageUrl && (
                    <img
                      src={form.imageUrl}
                      alt="preview"
                      className="h-16 w-16 rounded-lg border border-gray-200 object-cover shadow-sm dark:border-gray-700"
                    />
                  )}
                </div>
              </div>
            )}

            {/* VIDEO */}
            {form.type === "video" && (
              <div className="col-span-1 sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                  YouTube Embed Link
                </label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/embed/..."
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  className={inputClasses}
                />
              </div>
            )}

            {/* EVENT */}
            {form.type === "event" && (
              <div className="col-span-1 space-y-4 sm:col-span-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                    Event Title
                  </label>
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                    Event Description
                  </label>
                  <textarea
                    placeholder="Event Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows={3}
                    className={inputClasses}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4 dark:border-gray-700">
            <button
              onClick={handleSubmit}
              disabled={saving || uploading}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && <FaSpinner className="animate-spin text-xs" />}
              {editing ? "Save Changes" : "Add Item"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-white py-16 dark:border-gray-700 dark:bg-gray-800">
          <FaSpinner className="animate-spin text-2xl text-blue-500" />
        </div>
      ) : items.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-14 text-center dark:border-gray-700 dark:bg-gray-800">
          <FaImage className="mb-3 text-3xl text-gray-300 dark:text-gray-600" />
          <p className="font-medium text-gray-500 dark:text-gray-400">
            No gallery items yet
          </p>
          <p className="mb-4 text-sm text-gray-400 dark:text-gray-500">
            Add a photo, video, or event to get started
          </p>
          <button
            onClick={() => {
              setEditing(null);
              resetForm();
              setShowForm(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700 md:block">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Preview</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-4 py-3">
                      {item.type === "photo" && (
                        <img
                          src={item.imageUrl}
                          className="h-12 w-12 rounded-lg border border-gray-100 object-cover dark:border-gray-700"
                          alt=""
                        />
                      )}
                      {item.type === "video" && (
                        <iframe
                          src={item.videoUrl}
                          className="h-12 w-20 rounded-lg border border-gray-100 dark:border-gray-700"
                          title="video"
                        ></iframe>
                      )}
                      {item.type === "event" && (
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {TYPE_ICON[item.type]} {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex items-center gap-1.5 rounded-md bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
                        >
                          <FaPen className="text-[10px]" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          className="flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                        >
                          {deletingId === item._id ? (
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
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-lg border border-gray-100 p-3 dark:border-gray-700"
              >
                <div className="flex gap-3">
                  {item.type === "photo" && (
                    <img
                      src={item.imageUrl}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      alt=""
                    />
                  )}
                  {item.type === "video" && (
                    <iframe
                      src={item.videoUrl}
                      className="h-14 w-20 shrink-0 rounded-lg"
                      title="video"
                    ></iframe>
                  )}
                  {item.type === "event" && (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-500/10">
                      <FaCalendarAlt />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      {item.type === "event" ? item.title : item.category}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium capitalize text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      {TYPE_ICON[item.type]} {item.type}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-amber-50 py-1.5 text-xs font-medium text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                  >
                    <FaPen className="text-[10px]" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-red-50 py-1.5 text-xs font-medium text-red-600 disabled:opacity-60 dark:bg-red-500/10 dark:text-red-400"
                  >
                    {deletingId === item._id ? (
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
        </div>
      )}
    </div>
  );
}

export default GalleryAdmin;