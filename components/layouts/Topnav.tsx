"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { defaultAdminNav } from "./Sidenav";

export default function Topnav({ title, breadcrumb, onOpenMobile }: { title?: string; breadcrumb?: string[]; onOpenMobile?: () => void }) {
  // derive title from current path if not explicitly provided
  const pathname = usePathname() || "/admin/dashboard";
  const matched = defaultAdminNav.find((it) => pathname === it.href || pathname.startsWith(it.href));
  const effectiveTitle = title ?? matched?.label ?? "Dashboard";
  const effectiveBreadcrumb = breadcrumb ?? ["Home", effectiveTitle];
  return (
    <header className="bg-white border-b border-gray-200 fixed left-0 lg:left-64 right-0 top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* mobile & tablet hamburger */}
          <button onClick={onOpenMobile} className="p-2 rounded-md lg:hidden mr-2" aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <div>
              <div className="hidden lg:flex text-sm text-gray-500 items-center gap-2">
                <span>{effectiveBreadcrumb[0]}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-gray-700 font-medium">{effectiveBreadcrumb[1]}</span>
              </div>
              <h2 className="text-lg font-bold">{effectiveTitle}</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md bg-green-50 text-green-600 hidden sm:inline-flex transform transition duration-150 ease-out hover:scale-105 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <button className="p-2 rounded-md bg-yellow-50 text-yellow-600 relative transform transition duration-150 ease-out hover:scale-105 hover:bg-yellow-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {/* placeholder avatar */}
            </div>
            <div className="text-sm hidden sm:block">Pasar Johar</div>
          </div>
        </div>
      </div>
    </header>
  );
}
