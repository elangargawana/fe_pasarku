"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { defaultAdminNav } from "./Sidenav";
import { useUiStore } from "../../stores/ui";
import Icon from "@/components/ui/Icon";

export default function Topnav({ title, breadcrumb, onOpenMobile }: { title?: string; breadcrumb?: string[]; onOpenMobile?: (() => void) | undefined }) {
  // derive title from current path if not explicitly provided
  const pathname = usePathname() || "/admin/dashboard";
  const matched = defaultAdminNav.find((it) => pathname === it.href || pathname.startsWith(it.href));
  const effectiveTitle = title ?? matched?.label ?? "Dashboard";
  const effectiveBreadcrumb = breadcrumb ?? ["Home", effectiveTitle];
  const setMobileOpen = useUiStore((s) => s.setMobileOpen);
  return (
    <header className="bg-white border-b border-gray-200 fixed left-0 lg:left-64 right-0 top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* mobile & tablet hamburger */}
          <button onClick={() => { setMobileOpen(true); if (onOpenMobile) onOpenMobile(); }} className="p-2 rounded-md lg:hidden mr-2" aria-label="Open menu">
            <Icon name="menu" className="w-5 h-5 text-gray-700" />
          </button>

          <div>
              <div className="hidden lg:flex text-sm text-gray-500 items-center gap-2">
                <span>{effectiveBreadcrumb[0]}</span>
                <Icon name="chevron-right" className="w-3 h-3 text-gray-400" />
                <span className="text-gray-700 font-medium">{effectiveBreadcrumb[1]}</span>
              </div>
              <h2 className="text-lg font-bold">{effectiveTitle}</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md bg-green-50 text-green-600 hidden sm:inline-flex transform transition duration-150 ease-out hover:scale-105 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-300">
            <Icon name="calendar" className="w-4 h-4" />
          </button>

          <button className="p-2 rounded-md bg-yellow-50 text-yellow-600 relative transform transition duration-150 ease-out hover:scale-105 hover:bg-yellow-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-300">
            <Icon name="bell" className="w-4 h-4" />
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
