"use client";

import React, { useEffect, useState } from "react";

export default function InventoriPage() {
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // When autoRefresh enabled, update `lastUpdated` periodically.
    if (!autoRefresh) return;
    const id = setInterval(() => setLastUpdated(new Date()), 30_000); // every 30s
    return () => clearInterval(id);
  }, [autoRefresh]);

  const formattedLastUpdated = lastUpdated.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="py-8">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">Auto Refresh</div>

            {/* Toggle control */}
            <button
              role="switch"
              aria-checked={autoRefresh}
              onClick={() => setAutoRefresh((v) => !v)}
              className={
                "inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm font-semibold " +
                (autoRefresh ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700")
              }
            >
              <span
                className={
                  "relative inline-flex h-5 w-10 flex-shrink-0 items-center rounded-full transition-colors duration-150 " +
                  (autoRefresh ? "bg-green-500" : "bg-gray-300")
                }
                aria-hidden
              >
                <span
                  className={
                    "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-150 " +
                    (autoRefresh ? "translate-x-5" : "translate-x-1")
                  }
                />
              </span>

              <span className="ml-1">{autoRefresh ? "On" : "Off"}</span>
            </button>
          </div>

          <div className="text-sm text-gray-600">Last Updated: {formattedLastUpdated} WIB</div>
        </div>

        <h1 className="text-2xl font-semibold">Aktivitas Inventori</h1>
      </div>
    </div>
  );
}
