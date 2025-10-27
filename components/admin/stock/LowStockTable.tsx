"use client";

import React, { useMemo } from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import ReusableTable from "../../ui/ReusableTable";

type Row = {
  id: string | number;
  photo?: string;
  productName: string;
  merchant: string;
  stock: number;
  status?: "Rendah" | "Normal" | "Habis";
};

const defaultRows: Row[] = [
  { id: 1, photo: "/file.svg", productName: "Beras 5kg", merchant: "Bu Ani", stock: 3, status: "Rendah" },
  { id: 2, photo: "/file.svg", productName: "Minyak Goreng", merchant: "Pak Budi", stock: 2, status: "Rendah" },
  { id: 3, photo: "/file.svg", productName: "Gula Pasir", merchant: "Bu Sari", stock: 1, status: "Habis" },
];

export default function LowStockTable({ rows = defaultRows }: { rows?: Row[] }) {
  const columnHelper = createColumnHelper<Row>();

  const columns: ColumnDef<Row, any>[] = useMemo(
    () => [
      columnHelper.accessor("productName", {
        header: "Produk",
        cell: (info) => <div className="text-sm text-gray-800">{String(info.getValue())}</div>,
      }),

      columnHelper.accessor("merchant", { header: "Pedagang", cell: (info) => <div className="text-sm text-gray-700">{info.getValue()}</div> }),

      columnHelper.accessor("stock", { header: "Stok", cell: (info) => <div className="text-sm font-medium text-gray-800">{info.getValue()}</div> }),

      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const s = info.getValue() as Row["status"];
          const tone = s === "Rendah" ? "bg-yellow-100 text-yellow-800" : s === "Habis" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
          return <div className={`text-sm px-3 py-1 rounded-full ${tone}`}>{s ?? "-"}</div>;
        },
      }),

      columnHelper.display({
        id: "actions",
        header: "Aksi",
        cell: (ctx: any) => (
          <div className="flex items-center justify-center">
            <button onClick={() => alert(`Hubungi ${ctx.row.original.merchant}`)} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-3 py-2 text-sm">
              Hubungi Pedagang
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  // grid template: product (photo + name), merchant, stock, status, actions
  const gridTemplate = "1fr 200px 120px 140px 220px";

  return <ReusableTable columns={columns} data={rows} gridTemplate={gridTemplate} initialPageSize={5} />;
}
