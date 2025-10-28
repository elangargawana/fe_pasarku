"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useUiStore } from "../../stores/ui";

type AdminNavItem = { label: string; href: string; icon?: React.ReactNode };

export const defaultAdminNav: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    label: "Pedagang",
    href: "/admin/pedagang",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zM21 21a9 9 0 10-18 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    label: "Produk",
    href: "/admin/produk",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M16 3v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    label: "Pesanan",
    href: "/admin/pesanan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1" fill="currentColor"/><circle cx="18" cy="20" r="1" fill="currentColor"/></svg>
    ),
  },
  {
    label: "Pencatatan Pasokan",
    href: "/admin/pencatatan-pasokan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    label: "Inventori",
    href: "/admin/inventori",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="4" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>
    ),
  },
  {
    label: "Keuangan",
    href: "/admin/keuangan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1v22M17 5H7a4 4 0 100 8h10a4 4 0 010 8H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    label: "Laporan",
    href: "/admin/laporan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3h6v6H9zM3 21V9h18v12H3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    label: "Pengaturan",
    href: "/admin/pengaturan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06c.36-.36.54-.86.33-1.82A1.65 1.65 0 014.6 9.6c-.36-.36-.86-.54-1.82-.33L2.72 9.33A2 2 0 015.55 6.5l.06.06c.36.36.86.54 1.82.33A1.65 1.65 0 019.75 6V5a2 2 0 014 0v.09c.17.63.63 1.13 1.2 1.51.96.21 1.46.03 1.82-.33l.06-.06A2 2 0 0119.45 6.5l-.06.06c-.36.36-.54.86-.33 1.82.28.57.88 1.03 1.51 1.2H19.4z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
];

export default function Sidenav({
  title = "Pasar Johar",
  role = "Pengelola Pasar",
  items = defaultAdminNav,
  logo,
  onLogout,
}: {
  title?: string;
  role?: string;
  items?: AdminNavItem[];
  logo?: React.ReactNode;
  onLogout?: () => void;
}) {
  const pathname = usePathname() || "/admin/dashboard";
  const router = useRouter();
  const mobileOpen = useUiStore((s: any) => s.mobileOpen);
  const setMobileOpen = useUiStore((s: any) => s.setMobileOpen);
  const [showLogout, setShowLogout] = React.useState(false);
  const [logoutVisible, setLogoutVisible] = React.useState(false);

  const openLogout = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowLogout(true);
      setLogoutVisible(true);
      return;
    }
    setShowLogout(true);
    // allow mount then trigger visible for transition
    setTimeout(() => setLogoutVisible(true), 10);
  };

  const closeLogout = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLogoutVisible(false);
      setShowLogout(false);
      return;
    }
    setLogoutVisible(false);
    // wait for transition to finish then unmount
    setTimeout(() => setShowLogout(false), 180);
  };

  React.useEffect(() => {
    // lock body scroll when mobile overlay open
    if (typeof document === 'undefined') return;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      {/* Desktop sidebar (visible on large screens only) */}
      <aside className="hidden lg:flex w-64 bg-white h-screen fixed left-0 top-0 bottom-0 flex-col shadow-sm z-20">
        <div className="p-6 text-center border-b border-gray-100">
          {/* temp logo: use an inline vercel-like triangle SVG colored green */}
          <div className="mx-auto w-20 h-20 mb-3 flex items-center justify-center">
            <svg className="w-20 h-20 text-green-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-500">Role: {role}</div>
        </div>

        <nav className="p-4 flex-1 overflow-auto">
          <ul className="space-y-2">
            {items.map((item: AdminNavItem) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg ${active ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <span className={`w-8 h-8 flex-shrink-0 rounded-md flex items-center justify-center ${active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {item.icon ?? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </span>
                    <span className="text-md font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={() => {
              setMobileOpen(false);
              if (onLogout) return onLogout();
              openLogout();
            }}
            className="w-full btn-logout py-3 rounded-full"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div className={`absolute inset-0 bg-black/40`} onClick={() => setMobileOpen(false)} />

        <aside className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-lg transform transition-transform flex flex-col h-full ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <div>
              <div className="font-semibold">{title}</div>
              <div className="text-xs text-gray-500">Role: {role}</div>
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <nav className="p-4 overflow-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            <ul className="space-y-2">
              {items.map((item: AdminNavItem) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg min-w-0 ${active ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                      <span className={`w-8 h-8 rounded-md flex items-center justify-center ${active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-gray-100 p-4">
            <button
              onClick={() => {
                setMobileOpen(false);
                if (onLogout) return onLogout();
                openLogout();
              }}
              className="w-full btn-logout py-3 rounded-full"
            >
              Log Out
            </button>
          </div>
        </aside>
      </div>

      <ConfirmDialog
        open={showLogout}
        title="Konfirmasi Logout"
        description="Apakah Anda yakin ingin logout?"
        confirmLabel="Logout"
        cancelLabel="Batal"
        onCancel={() => closeLogout()}
        onConfirm={() => {
          closeLogout();
          if (onLogout) {
            setTimeout(() => onLogout(), 180);
            return;
          }
          setTimeout(() => router.push('/auth/login'), 200);
        }}
      />
    </>
  );
}
