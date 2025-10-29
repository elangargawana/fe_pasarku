"use client";

import React, { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import ReusableTable from "../../ui/ReusableTable";
import IconButton from "../../ui/button/IconButton";
import ViewDetailModal from "./ViewDetailModal";

type Row = {
  id: string | number;
  photo?: string;
  name: string;
  phone?: string;
  toko?: string;
  kios?: string;
  kategori?: string;
  status?: "Aktif" | "Pending" | "Nonaktif";
  produkCount?: string;
  rating?: string;
  transaksi?: string;
  revenue?: string;
  joinedAt?: string;
};

const defaultRows: Row[] = [
  {
    id: "p-1",
    photo: "/file.svg",
    name: "Bu Ani",
    toko: "Toko Bu Ani",
    phone: "081234567890",
    kios: "A-12",
    kategori: "Sayuran",
    status: "Pending",
    produkCount: "28 item",
    rating: "4.8 (250)",
    transaksi: "142",
    revenue: "Rp 3.5M",
    joinedAt: "20 Okt 2025",
  },
  {
    id: "p-2",
    photo: "/file.svg",
    name: "Bu Ani",
    toko: "Toko Bu Ani",
    phone: "081234567890",
    kios: "A-12",
    kategori: "Sayuran",
    status: "Pending",
    produkCount: "28 item",
    rating: "4.8 (250)",
    transaksi: "62",
    revenue: "Rp 1.2M",
    joinedAt: "20 Okt 2025",
  },
  {
    id: "p-3",
    photo: "/file.svg",
    name: "Bu Ani",
    toko: "Toko Bu Ani",
    phone: "081234567890",
    kios: "A-12",
    kategori: "Sayuran",
    status: "Pending",
    produkCount: "28 item",
    rating: "4.8 (250)",
    transaksi: "8",
    revenue: "Rp 120k",
    joinedAt: "20 Okt 2025",
  },
  {
    id: "p-4",
    photo: "/file.svg",
    name: "Bu Ani",
    toko: "Toko Bu Ani",
    phone: "081234567890",
    kios: "A-12",
    kategori: "Sayuran",
    status: "Aktif",
    produkCount: "28 item",
    rating: "4.8 (250)",
    transaksi: "142",
    revenue: "Rp 2.1M",
    joinedAt: "20 Okt 2025",
  },
  {
    id: "p-5",
    photo: "/file.svg",
    toko: "Toko Bu Ani",
    name: "Bu Ani",
    phone: "081234567890",
    kios: "A-12",
    kategori: "Sayuran",
    status: "Aktif",
    produkCount: "28 item",
    rating: "4.8 (250)",
    transaksi: "12",
    revenue: "Rp 80k",
    joinedAt: "20 Okt 2025",
  },
];

export default function ApprovalTablePedagang({ rows = defaultRows, onSelectionChange, statusFilter, clearSelectionSignal, }: { rows?: Row[]; onSelectionChange?: (ids: Set<string | number>, hasActiveSelected?: boolean) => void; statusFilter?: "Aktif" | "Pending" | null; clearSelectionSignal?: number; }) {
  const columnHelper = useMemo(() => createColumnHelper<Row>(), []);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [viewRow, setViewRow] = useState<Row | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const displayRows = useMemo(() => (statusFilter ? rows.filter((r) => r.status === statusFilter) : rows), [rows, statusFilter]);

  // toggle all selection (apply only to visible/displayed rows)
  const toggleAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === displayRows.length) return new Set();
      return new Set(displayRows.map((r) => r.id));
    });
  }, [displayRows]);

  // notify parent when selection changes
  React.useEffect(() => {
    if (onSelectionChange) {
      // compute whether any of the currently selected ids correspond to an 'Aktif' row
      const hasActive = Array.from(selectedIds).some((id) => {
        const r = rows.find((row) => row.id === id);
        return r?.status === "Aktif";
      });
      onSelectionChange(new Set(selectedIds), hasActive);
    }
  }, [selectedIds, onSelectionChange, rows]);

  const toggleRow = useCallback((id: string | number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // respond to clearSelectionSignal from parent: when it changes, clear selectedIds
  React.useEffect(() => {
    if (typeof clearSelectionSignal === 'number') {
      setSelectedIds(new Set());
    }
  }, [clearSelectionSignal]);

  // When the filter changes, clear selection so leftover IDs from a previous
  // filter don't cause the header checkbox or toolbar to reflect stale state.
  React.useEffect(() => {
    setSelectedIds(new Set());
  }, [statusFilter]);

  // types from tanstack can be verbose here; allow `any` for column value because
  // columns can reference mixed types (string | number | undefined) across fields.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Row, any>[] = useMemo(
    () => [
      // ✅ Kolom Checkbox + header toggle
      columnHelper.display({
        id: "select",
        header: () => (
          <div className="flex items-center justify-center px-4">
            <input
              type="checkbox"
              checked={displayRows.length > 0 && selectedIds.size === displayRows.length}
              onChange={toggleAll}
              className="w-4 h-4 text-green-600 rounded cursor-pointer"
            />
          </div>
        ),
        cell: (ctx) => (
          <div className="flex items-center justify-center px-4">
            <input
              type="checkbox"
              checked={selectedIds.has(ctx.row.original.id)}
              onChange={() => toggleRow(ctx.row.original.id)}
              className="w-4 h-4 text-green-600 rounded cursor-pointer"
            />
          </div>
        ),
      }),

      // Foto
      columnHelper.display({
        id: "photo",
        header: "Foto",
        cell: (ctx) => (
          <div className="flex items-center justify-center px-4">
            <Image
              src={String(ctx.row.original.photo)}
              alt={String(ctx.row.original.name)}
              width={48}
              height={48}
              className="w-12 h-12 rounded-md object-cover"
            />
          </div>
        ),
      }),

      // Nama + no HP
      columnHelper.display({
        id: "name",
        header: "Nama",
        cell: (ctx) => (
          <div className="text-sm pl-2">
            <div className="font-medium">{ctx.row.original.name}</div>
            <div className="text-xs text-gray-500">{ctx.row.original.toko ?? ctx.row.original.kios}</div>
            <div className="text-xs text-gray-500">{ctx.row.original.phone}</div>
          </div>
        ),
      }),

      columnHelper.accessor("kios", {
        header: "Kios",
        cell: (info) => <div className="text-center text-sm text-gray-700">{info.getValue() ?? "-"}</div>,
      }),

      columnHelper.accessor("kategori", {
        header: "Kategori",
        cell: (info) => <div className="text-center text-sm text-gray-700">{info.getValue() ?? "-"}</div>,
      }),

      columnHelper.display({
        id: "status",
        header: "Status",
        cell: (ctx) => (
          <div className="flex justify-center">
            {ctx.row.original.status === "Aktif" ? (
              <div className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs">Aktif</div>
            ) : (
              <div className="px-3 py-1 rounded-full bg-white text-gray-600 text-xs border">Pending</div>
            )}
          </div>
        ),
      }),

      columnHelper.accessor("produkCount", {
        header: "Produk",
        cell: (info) => <div className="text-center text-sm text-gray-700">{info.getValue()}</div>,
      }),

      columnHelper.display({
        id: "rating",
        header: "Rating",
        cell: (ctx) => (
          <div className="flex justify-center items-center gap-2 text-sm text-gray-700">
            <span className="text-yellow-500">★</span>
            <span>{ctx.row.original.rating}</span>
          </div>
        ),
      }),

      columnHelper.accessor("transaksi", {
        header: "Transaksi",
        cell: (info) => {
          const count = info.getValue();
          const row = info.row.original as Row;
          return (
            <div className="flex justify-center items-center gap-3 text-sm text-gray-700">
              <div>{count}</div>
              <div className="h-6 border-l border-gray-200" />
              <div className="font-medium text-right">{row.revenue ?? "-"}</div>
            </div>
          );
        },
      }),

      columnHelper.accessor("joinedAt", {
        header: "Tgl Bergabung",
        cell: (info) => <div className="text-center text-sm text-gray-700">{info.getValue()}</div>,
      }),

      // ✅ Kolom Aksi tetap ada
      columnHelper.display({
        id: "actions",
        header: "Aksi",
        cell: (ctx) => {
          const status = ctx.row.original.status;
          if (status === "Aktif") {
            return (
              <div className="flex justify-center gap-3">
                <IconButton variant="blue" aria-label="Lihat dokumen" onClick={() => { setViewRow(ctx.row.original); setModalOpen(true); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </IconButton>

                  <IconButton variant="yellow" aria-label="Edit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M15.232 5.232l3.536 3.536L8.536 18.999l-3.536.707.707-3.536L15.232 5.232z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </IconButton>

                <IconButton variant="green" aria-label="Lainnya">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="1.6" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                    <circle cx="19" cy="12" r="1.6" fill="currentColor" />
                  </svg>
                </IconButton>
              </div>
            );
          }

          return (
            <div className="flex justify-center gap-3">
              <IconButton variant="green" aria-label="Setujui">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </IconButton>

              <IconButton variant="red" aria-label="Tolak">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </IconButton>

              <IconButton variant="blue" aria-label="Lihat dokumen" onClick={() => { setViewRow(ctx.row.original); setModalOpen(true); }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </IconButton>
            </div>
          );
        },
      }),
    ],
    [selectedIds, displayRows, columnHelper, toggleAll, toggleRow, setModalOpen, setViewRow]
  );

  const gridTemplate =
    "48px 72px 240px 120px 160px 120px 120px 120px 160px 160px 160px";

  return (
    <>
      <ReusableTable columns={columns} data={displayRows} gridTemplate={gridTemplate} initialPageSize={5} />
      <ViewDetailModal open={modalOpen} onClose={() => setModalOpen(false)} onClosed={() => setViewRow(null)} status={viewRow?.status} data={viewRow} />
    </>
  );
}
