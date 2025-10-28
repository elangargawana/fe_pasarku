"use client";

import React, { useEffect, useState } from "react";
import ActiveDetail from "./ActiveDetail";
import PendingDetail from "./PendingDetail";

type Props = {
  open: boolean;
  onClose?: () => void;
  // Called after the modal has finished its closing animation and is
  // removed from the DOM. Useful so parents can clear the data only
  // after the modal fully unmounts (prevents flicker during fade-out).
  onClosed?: () => void;
  status?: "Aktif" | "Pending" | "Nonaktif";
  data?: any;
};

export default function ViewDetailModal({ open, onClose, onClosed, status, data }: Props) {
  const [visible, setVisible] = useState(false); // tetap di DOM
  const [show, setShow] = useState(false); // untuk animasi fade

  useEffect(() => {
    if (open) {
      setVisible(true);
      // sedikit delay agar transisi masuk bisa berjalan
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
      // tunggu animasi keluar selesai baru hilangkan dari DOM. Setelah
      // element dihapus, beri tahu parent lewat `onClosed` supaya parent
      // bisa membersihkan data yang terkait (mis. `viewRow`).
      const timeout = setTimeout(() => {
        setVisible(false);
        if (typeof onClosed === "function") onClosed();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start sm:items-start justify-center pt-6 sm:pt-20 transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className={`relative w-full max-w-3xl mx-4 bg-white rounded-lg shadow-lg transform transition-all duration-200 overflow-hidden max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)] ${
          show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 sm:-translate-y-2 scale-95"
        }`}
      >
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h4 className="text-lg font-semibold">Detail Pedagang</h4>
          <button
            aria-label="Tutup"
            onClick={onClose}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
          {status === "Aktif" ? (
            <ActiveDetail data={data} onClose={onClose} />
          ) : status === "Pending" ? (
            <PendingDetail data={data} onClose={onClose} />
          ) : (
            <div className="text-sm text-slate-700">
              Status tidak tersedia untuk tampilan detail.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
