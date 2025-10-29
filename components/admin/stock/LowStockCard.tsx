import React from "react";
import LowStockTable from "./LowStockTable";

type Props = {
  title?: string;
  className?: string;
  itemCount?: number;
};

export default function LowStockCard({ title = "Produk Stock Rendah", className = "", itemCount }: Props) {
  return (
    <div className={["bg-green-50 rounded-lg p-6 shadow-sm", className].filter(Boolean).join(" ")}>
      {typeof itemCount === "number" && (
        <div className="flex items-center justify-end mb-4">
          <div className="text-sm text-gray-600">{itemCount} item{itemCount !== 1 ? "s" : ""}</div>
        </div>
      )}

      <div>
        <LowStockTable />
      </div>
    </div>
  );
}
