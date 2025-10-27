"use client";

import React, { useMemo } from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import ReusableTable from "../../ui/ReusableTable";
import Button from "../../ui/Button";

type ApprovalRow = {
  id: string | number;
  photo?: string;
  name: string;
  kios?: string;
  registeredAt?: string;
};

const defaultRows: ApprovalRow[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `s-${i}`,
  photo: "/file.svg",
  name: "Bu Ani",
  kios: "A-12",
  registeredAt: "20 Okt 2025",
}));

export default function ApprovalTable({ rows = defaultRows }: { rows?: ApprovalRow[] }) {
  const columnHelper = createColumnHelper<ApprovalRow>();

  const columns: ColumnDef<ApprovalRow, any>[] = useMemo(
    () => [
      columnHelper.display({
        id: "photo",
        header: "Foto",
        cell: (ctx: any) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={String(ctx.row.original.photo)} alt={String(ctx.row.original.name)} className="w-12 h-12 rounded-md object-cover" />
        ),
      }),

      columnHelper.accessor("name", { header: "Nama", cell: (info) => <div className="text-sm text-gray-800">{String(info.getValue())}</div> }),

      columnHelper.accessor("kios", { header: "Kios", cell: (info) => <div className="text-sm text-gray-700">{info.getValue() ?? "-"}</div> }),

      columnHelper.accessor("registeredAt", { header: "Tanggal Daftar", cell: (info) => <div className="text-sm text-gray-700">{info.getValue() ?? "-"}</div> }),

      columnHelper.display({
        id: "document",
        header: "Dokumen",
        cell: () => (
          <div className="flex justify-center">
            <button className="w-10 h-10 rounded-full border-2 border-blue-300 text-blue-500 flex items-center justify-center hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600 transition-colors duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        ),
      }),

      columnHelper.display({
        id: "actions",
        header: "Aksi",
        cell: (ctx: any) => (
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="success"
              onClick={() => alert(`Setujui ${ctx.row.original.id}`)}
              className="inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Disetujui</span>
            </Button>

            <button
              onClick={() => alert(`Tolak ${ctx.row.original.id}`)}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-sm">Ditolak</span>
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  return <ReusableTable columns={columns} data={rows} gridTemplate="72px 1fr 120px 160px 120px 260px" initialPageSize={5} />;
}

