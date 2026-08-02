import React, { useEffect, useState, useCallback, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import {
  FaBoxOpen,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaSyncAlt,
  FaCircle,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

const Reports = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEmails: 0,
    unreadEmails: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const socketRef = useRef(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ✅ Fetch report data — same endpoint/logic as before
  const fetchReports = useCallback(async ({ silent = false } = {}) => {
    if (silent) setRefreshing(true);
    try {
      const res = await axios.get(`${backendURL}/api/reports`);
      setStats(res.data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("❌ Error fetching reports:", err);
      setError("Failed to load reports. Check your connection and try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [backendURL]);

  useEffect(() => {
    fetchReports();

    // ✅ Real-time updates via socket.io — same event/logic as before
    const socket = io(backendURL);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("new_email", () => {
      fetchReports({ silent: true });
    });

    return () => socket.disconnect();
  }, [backendURL, fetchReports]);

  const cards = [
    {
      key: "totalProducts",
      label: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      accent: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      key: "totalEmails",
      label: "Total Emails",
      value: stats.totalEmails,
      icon: <FaEnvelope />,
      accent: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      key: "unreadEmails",
      label: "Unread Emails",
      value: stats.unreadEmails,
      icon: <FaEnvelopeOpenText />,
      accent: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-50 dark:bg-red-500/10",
      highlight: stats.unreadEmails > 0,
    },
  ];

  const formatTime = (date) =>
    date
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      : "—";

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            📊 Real-Time Reports
          </h2>
          <div className="mt-1 flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1.5">
              <FaCircle
                className={`text-[8px] ${
                  connected ? "text-emerald-500" : "text-gray-300 dark:text-gray-600"
                }`}
              />
              {connected ? "Live" : "Reconnecting..."}
            </span>
            <span>·</span>
            <span>Updated {formatTime(lastUpdated)}</span>
          </div>
        </div>

        <button
          onClick={() => fetchReports({ silent: true })}
          disabled={refreshing || loading}
          className="flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <FaSyncAlt className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          <FaExclamationTriangle />
          <span className="flex-1">{error}</span>
          <button
            onClick={() => fetchReports()}
            className="font-medium underline underline-offset-2 hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-4 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-8 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.key}
              className={`relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800 ${
                card.highlight
                  ? "border-red-200 dark:border-red-500/30"
                  : "border-gray-100 dark:border-gray-700"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.label}
                  </p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {card.value.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-lg text-lg ${card.iconBg} ${card.accent}`}
                >
                  {card.icon}
                </div>
              </div>

              {card.key === "unreadEmails" && (
                <p
                  className={`mt-3 text-xs font-medium ${
                    card.highlight
                      ? "text-red-500 dark:text-red-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {card.highlight
                    ? `${stats.unreadEmails} awaiting response`
                    : "All caught up"}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;