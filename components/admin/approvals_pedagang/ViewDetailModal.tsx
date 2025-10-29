"use client";

import React, { useEffect, useState } from "react";
import ActiveDetail from "./ActiveDetail";
import PendingDetail from "./PendingDetail";
import TransitionModal from "@/components/ui/TransitionModal";

type Props = {
  open: boolean;
  onClose?: () => void;
  // Called after the modal has finished its closing animation and is
  // removed from the DOM. Useful so parents can clear the data only
  // after the modal fully unmounts (prevents flicker during fade-out).
  onClosed?: () => void;
  status?: "Aktif" | "Pending" | "Nonaktif";
  data?: { photo?: string; nama?: string; reviews?: unknown; name?: string; phone?: string; email?: string; address?: string; toko?: string; kios?: string; kategori?: string; joinedAt?: string };
};

export default function ViewDetailModal({ open, onClose, onClosed, status, data }: Props) {
  const [visible, setVisible] = useState(false); // tetap di DOM
  const [show, setShow] = useState(false); // untuk animasi fade

  useEffect(() => {
    let enterTimer: ReturnType<typeof setTimeout> | null = null;
    let showTimer: ReturnType<typeof setTimeout> | null = null;
    let exitTimer: ReturnType<typeof setTimeout> | null = null;

    if (open) {
      // defer state updates to avoid synchronous setState inside effect
      enterTimer = setTimeout(() => {
        setVisible(true);
        // sedikit delay agar transisi masuk bisa berjalan
        showTimer = setTimeout(() => setShow(true), 10);
      }, 0);
    } else {
      // defer hide to avoid synchronous setState inside effect
      showTimer = setTimeout(() => setShow(false), 0);
      // tunggu animasi keluar selesai baru hilangkan dari DOM. Setelah
      // element dihapus, beri tahu parent lewat `onClosed` supaya parent
      // bisa membersihkan data yang terkait (mis. `viewRow`).
      exitTimer = setTimeout(() => {
        setVisible(false);
        if (typeof onClosed === "function") onClosed();
      }, 200);
    }

    return () => {
      if (enterTimer) clearTimeout(enterTimer);
      if (showTimer) clearTimeout(showTimer);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [open, onClosed]);

  if (!visible) return null;

  return (
    <TransitionModal
      show={show}
      onClose={onClose}
      panelClassName={"mx-4 w-full max-w-3xl max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)] overflow-hidden"}
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
          <div className="text-sm text-slate-700">Status tidak tersedia untuk tampilan detail.</div>
        )}
      </div>
    </TransitionModal>
  );
}
