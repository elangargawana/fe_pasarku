"use client";

import React, { useState } from "react";
import ApprovalTable from "./ApprovalTableDashboard";

type Props = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  pedagangCount?: number;
  produkCount?: number;
};

export default function ApprovalCardDashboard({ title, children, className = "", pedagangCount = 20, produkCount = 20 }: Props) {
  const [tab, setTab] = useState<'pedagang' | 'produk'>('pedagang');

  return (
    <div className={["bg-green-50 rounded-lg p-6 shadow-sm", className].filter(Boolean).join(' ')}>
      {title && (
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-gray-800">{title}</div>
        </div>
      )}

      {/* Toggle buttons inside the card (Pedagang Baru / Produk Baru) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <button
          type="button"
          onClick={() => setTab('pedagang')}
          className={`w-full py-3 rounded-full flex items-center justify-center focus:outline-none ${
            tab === 'pedagang'
              ? 'bg-green-700 text-white border-transparent'
              : 'bg-green-50 border border-green-600 text-green-700 hover:bg-green-100 transition-colors duration-150'
          }`}
        >
          <span className="flex items-center justify-center">
            Pedagang Baru
            <span className="ml-3 inline-flex items-center justify-center bg-yellow-400 text-xs text-black rounded-full px-2 py-0.5">{pedagangCount}</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTab('produk')}
          className={`w-full py-3 rounded-full flex items-center justify-center focus:outline-none ${
            tab === 'produk'
              ? 'bg-green-700 text-white border-transparent'
              : 'bg-green-50 border border-green-600 text-green-700 hover:bg-green-100 transition-colors duration-150'
          }`}
        >
          <span className="flex items-center justify-center">
            Produk Baru
            <span className="ml-3 inline-flex items-center justify-center bg-yellow-400 text-xs text-black rounded-full px-2 py-0.5">{produkCount}</span>
          </span>
        </button>
      </div>

      <div>
        {/* Mount the reusable ApprovalTable here. We choose rows based on the selected tab. */}
        {tab === 'pedagang' ? (
          <ApprovalTable rows={Array.from({ length: pedagangCount }).map((_, i) => ({ id: `ped-${i}`, photo: '/file.svg', name: 'Bu Ani', kios: 'A-12', registeredAt: '20 Okt 2025' }))} />
        ) : (
          <ApprovalTable rows={Array.from({ length: produkCount }).map((_, i) => ({ id: `prd-${i}`, photo: '/file.svg', name: `Produk ${i + 1}`, kios: '-', registeredAt: '20 Okt 2025' }))} />
        )}
        {children}
      </div>
    </div>
  );
}
