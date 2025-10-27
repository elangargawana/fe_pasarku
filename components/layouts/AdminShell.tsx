"use client";

import React from "react";
import Sidenav, { defaultAdminNav } from "./Sidenav";
import Topnav from "./Topnav";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
  <Sidenav mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} items={defaultAdminNav} />
      <Topnav onOpenMobile={() => setMobileOpen(true)} />

      <main className="lg:ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
