"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  Header,
  Row as TableRow,
  Cell as TableCell,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

// Allow any for ColumnDef because accessor return types vary across callers.
type Props<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  gridTemplate?: string;
  initialPageSize?: number;
  hidePagination?: boolean;
};

export default function ReusableTable<T extends object>({
  columns,
  data,
  gridTemplate = "72px 1fr 120px 160px 120px 260px",
  initialPageSize = 5,
  hidePagination = false,
}: Props<T>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const total = data.length;
  const pageIndex = pagination.pageIndex;
  const pageSize = pagination.pageSize;
  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min(total, (pageIndex + 1) * pageSize);

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto rounded-md border border-green-200">
        <div
          className="min-w-[700px] sm:min-w-full"
          style={{ display: "grid", gridTemplateColumns: "1fr" }}
        >
          {/* Header */}
          <div className="bg-green-600 text-white text-sm font-semibold rounded-t-md min-w-max">
            <div
              className="grid gap-4 items-center px-3 py-3"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              {table.getHeaderGroups()[0].headers.map((h: Header<T, unknown>) => (
                <div key={h.id} className="text-center whitespace-nowrap">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="bg-green-50 min-w-max">
              {table.getRowModel().rows.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-600">
                Tidak ada data.
              </div>
            ) : (
              table.getRowModel().rows.map((row: TableRow<T>) => (
                <div
                  key={row.id}
                  className="grid items-center gap-4 px-3 py-5 border-t border-green-100"
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  {row.getVisibleCells().map((cell: TableCell<T, unknown>) => {
                    // Tentukan alignment otomatis
                    const align = (cell.column.columnDef.meta as Record<string, unknown>)?.align || "center";

                    const justifyClass =
                      align === "start"
                        ? "justify-start pl-2"
                        : align === "end"
                        ? "justify-end pr-2"
                        : "justify-center";

                    return (
                      <div
                        key={cell.id}
                        className={`flex items-center ${justifyClass} whitespace-nowrap`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {!hidePagination && (
        <div className="mt-4 px-4 py-3 bg-green-50 flex flex-col sm:flex-row items-center sm:justify-between text-sm text-gray-600 gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="whitespace-nowrap">Item Perhalaman</div>
            <select
              aria-label="Items per page"
              value={pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="rounded-full border px-3 py-1 bg-white text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <div className="whitespace-nowrap">
              {start}-{end} Of {total}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => table.setPageIndex(Math.max(0, pageIndex - 1))}
              disabled={pageIndex === 0}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            >
              ←
            </button>

            <div className="flex items-center gap-2 sm:hidden text-sm">
              <div className="font-medium">{pageIndex + 1}</div>
              <div className="text-gray-400">/</div>
              <div className="text-gray-600">
                {Math.max(1, Math.ceil(total / pageSize))}
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              {Array.from({ length: Math.max(1, Math.ceil(total / pageSize)) }).map(
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => table.setPageIndex(i)}
                    aria-current={i === pageIndex ? "page" : undefined}
                    className={`px-2 py-1 rounded ${
                      i === pageIndex
                        ? "text-green-600 border-b-2 border-green-600"
                        : "text-gray-700 hover:text-green-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                table.setPageIndex(
                  Math.min(
                    Math.max(0, Math.ceil(total / pageSize) - 1),
                    pageIndex + 1
                  )
                )
              }
              disabled={pageIndex >= Math.ceil(total / pageSize) - 1}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
