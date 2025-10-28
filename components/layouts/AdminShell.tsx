"use client";

import React from "react";
import Sidenav, { defaultAdminNav } from "./Sidenav";
import Topnav from "./Topnav";
import { useUiStore } from "../../stores/ui";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const mobileOpen = useUiStore((s) => s.mobileOpen);
  const setMobileOpen = useUiStore((s) => s.setMobileOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidenav items={defaultAdminNav} />
      <Topnav onOpenMobile={() => setMobileOpen(true)} />

      <main className="lg:ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
