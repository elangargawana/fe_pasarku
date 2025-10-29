"use client";

import React, { useEffect, useState } from "react";

type Props = {
  date?: Date | string;
  live?: boolean; // if true, update time live
  label?: string; // e.g. 'Hari Ini -'
  timezoneLabel?: string; // e.g. 'WIB'
  className?: string;
};

export default function DateTimeBadge({
  date,
  live = false,
  label = "Hari Ini -",
  timezoneLabel = "WIB",
  className = "",
}: Props) {
  const [now, setNow] = useState<Date>(() => (date ? new Date(date) : new Date()));

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [live]);

  useEffect(() => {
    if (!date) return;
    const t = setTimeout(() => setNow(new Date(date)), 0);
    return () => clearTimeout(t);
  }, [date]);

  const formatted = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={["inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 text-green-700 px-3 py-1 text-sm", className].filter(Boolean).join(" ")}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
      </svg>
      <div className="flex flex-col sm:flex-row items-start sm:items-center">
        <span className="font-medium leading-tight">{label}</span>
        <span className="text-xs sm:text-sm text-green-700/90 sm:ml-2">{formatted}</span>
      </div>
    </div>
  );
}
