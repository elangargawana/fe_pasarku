"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useUiStore } from "../../stores/ui";
import Icon from "@/components/ui/Icon";

type AdminNavItem = { label: string; href: string; icon?: React.ReactNode };

export const defaultAdminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <Icon name="dashboard" className="w-4 h-4" /> },
  { label: "Pedagang", href: "/admin/pedagang", icon: <Icon name="user" className="w-4 h-4" /> },
  { label: "Produk", href: "/admin/produk", icon: <Icon name="product" className="w-4 h-4" /> },
  { label: "Pesanan", href: "/admin/pesanan", icon: <Icon name="cart" className="w-4 h-4" /> },
  { label: "Pencatatan Pasokan", href: "/admin/pencatatan_pasokan", icon: <Icon name="list" className="w-4 h-4" /> },
  { label: "Inventori", href: "/admin/inventori", icon: <Icon name="inventory" className="w-4 h-4" /> },
  { label: "Keuangan", href: "/admin/keuangan", icon: <Icon name="wallet" className="w-4 h-4" /> },
  { label: "Laporan", href: "/admin/laporan", icon: <Icon name="report" className="w-4 h-4" /> },
  { label: "Pengaturan", href: "/admin/pengaturan", icon: <Icon name="settings" className="w-4 h-4" /> },
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
                      <span className={`w-8 h-8 shrink-0 rounded-md flex items-center justify-center ${active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {item.icon ?? <Icon name="list" className="w-4 h-4" />}
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
