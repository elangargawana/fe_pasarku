"use client";

import React, { useMemo, useCallback } from "react";
import ReusableTable from "../../ui/ReusableTable";
import IconButton from "../../ui/button/IconButton";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import ImageLightbox from "@/components/ui/ImageLightbox";

type Row = {
  id: string;
  waktu: string;
  komoditas: string;
  jumlah: number;
  satuan: string;
  supplierName: string;
  supplierPhone: string;
  harga: string;
  total: string;
  photos: string[];
  pencatat: string;
};

export default function ActivitiesTableLogging() {
  const [modalImage, setModalImage] = React.useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(false); // kontrol animasi

  const handleOpenImage = useCallback((src: string) => {
    setModalImage(src);
    setTimeout(() => setIsVisible(true), 10); // biar transisi fade-in jalan
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setModalImage(null), 300); // tunggu fade-out dulu baru unmount
  }, []);

  const columnHelper = useMemo(() => createColumnHelper<Row>(), []);

  const columns = useMemo(
    () => [
    columnHelper.accessor("waktu", {
      header: "Waktu",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      meta: { align: "center" },
    }),
    columnHelper.accessor("komoditas", {
      header: "Komoditas",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      meta: { align: "start" },
    }),
    columnHelper.accessor("jumlah", {
      header: "Jumlah",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      meta: { align: "center" },
    }),
    columnHelper.accessor("satuan", {
      header: "Satuan",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      meta: { align: "center" },
    }),
    columnHelper.display({
      id: "supplier",
      header: "Supplier",
      cell: (ctx) => (
        <div className="text-sm">
          <div className="font-medium">{ctx.row.original.supplierName}</div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 5a2 2 0 012-2h1.6a1 1 0 01.8.4l1.2 1.8a1 1 0 01-.1 1.2L7.5 8.9a11 11 0 005.6 5.6l1.1-1.1a1 1 0 011.2-.1l1.8 1.2a1 1 0 01.4.8V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
              />
            </svg>
            <span className="text-sm">{ctx.row.original.supplierPhone}</span>
          </div>
        </div>
      ),
      meta: { align: "start" },
    }),
    columnHelper.accessor("harga", {
      header: "Harga (Grosir)",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      meta: { align: "center" },
    }),
    columnHelper.accessor("total", {
      header: "Total Nilai",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      meta: { align: "center" },
    }),
    columnHelper.display({
      id: "foto",
      header: "Foto",
      cell: (ctx) => (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, idx) => {
            const src = ctx.row.original.photos[idx] ?? "/bayam.jpg";
            return (
              <div
                key={idx}
                className="w-14 h-14 rounded-md overflow-hidden relative bg-green-50 border border-green-100"
              >
                <img
                  src={src}
                  alt={`foto-${idx}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    aria-label={`Lihat foto ${idx + 1}`}
                    title="Lihat gambar"
                    onClick={() => handleOpenImage(src)}
                    className="group inline-flex items-center justify-center bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-sm transition-all duration-150 hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ),
      meta: { align: "start" },
    }),
    columnHelper.accessor("pencatat", {
      header: "Dicatat Oleh",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
      meta: { align: "center" },
    }),
    columnHelper.display({
      id: "aksi",
      header: "Aksi",
      cell: (ctx) => (
        <div className="flex justify-center gap-3">
          <IconButton aria-label="Edit" variant="yellow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15.232 5.232l3.536 3.536L8.536 18.999l-3.536.707.707-3.536L15.232 5.232z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>

          <IconButton aria-label="Hapus" variant="red">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M6 3.5A1.5 1.5 0 017.5 2h5A1.5 1.5 0 0114 3.5V4h3.5a.5.5 0 010 1H16v10.5A2.5 2.5 0 0113.5 18H6.5A2.5 2.5 0 014 15.5V5H1.5a.5.5 0 010-1H5v-.5zM8 7a1 1 0 10-2 0v7a1 1 0 102 0V7zm5-1a1 1 0 00-1 1v7a1 1 0 102 0V7a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </IconButton>
        </div>
      ),
      meta: { align: "center" },
    }),
    ],
    [columnHelper, handleOpenImage]
  );

  const rows: Row[] = Array.from({ length: 5 }).map((_, i) => ({
    id: String(i + 1),
    waktu: "08:30 WIB",
    komoditas: "Bayam",
    jumlah: 50,
    satuan: "kg",
    supplierName: "Pak Budi",
    supplierPhone: "08129999999",
    harga: "Rp 2.000/kg",
    total: "Rp 100.000",
    photos: ["/bayam.jpg", "/bayam.jpg", "/bayam.jpg"],
    pencatat: "Admin Joko",
  }));

  const gridTemplate =
    "140px 1fr 80px 72px 220px 140px 140px 200px 160px 104px";

  return (
    <>
      <ReusableTable
        columns={columns}
        data={rows}
        gridTemplate={gridTemplate}
        initialPageSize={5}
      />

      {/* Modal selalu dirender agar transisi open bisa berjalan */}
      {modalImage && (
        <ImageLightbox src={modalImage} alt="foto full" show={isVisible} onClose={handleCloseModal} />
      )}
    </>
  );
}
