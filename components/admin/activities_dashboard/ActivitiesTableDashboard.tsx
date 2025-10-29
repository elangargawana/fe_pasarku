"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import ReusableTable from "../../ui/ReusableTable";

type Activity = {
  id: string | number;
  icon?: string;
  text: string;
  time: string;
};

const defaultRows: Activity[] = [
  { id: 1, icon: "/next.svg", text: "Bu Ani approved sebagai pedagang", time: "10 Menit yang lalu" },
  { id: 2, icon: "/next.svg", text: "12 Produk Ditambahkan", time: "1 Jam yang lalu" },
  { id: 3, icon: "/next.svg", text: "Supply log: 50kg beras", time: "2 Jam yang lalu" },
  { id: 4, icon: "/next.svg", text: "Supply log: 50kg beras", time: "2 Jam yang lalu" },
  { id: 5, icon: "/next.svg", text: "Supply log: 50kg beras", time: "2 Jam yang lalu" },
];

export default function ActivitiesTable({ rows = defaultRows }: { rows?: Activity[] }) {
  const columnHelper = useMemo(() => createColumnHelper<Activity>(), []);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "name",
        header: "Aktivitas",
        meta: { align: "start" },
        cell: (ctx) => (
          <div className="flex items-start gap-3">
            <Image src={ctx.row.original.icon ?? '/file.svg'} alt="icon" width={24} height={24} className="w-6 h-6" />
            <div className="text-sm text-gray-800">{ctx.row.original.text}</div>
          </div>
        ),
      }),

      columnHelper.accessor("time", { header: "Waktu", cell: (info) => <div className="text-sm text-gray-600 text-right">{info.getValue()}</div> }),
    ],
    [columnHelper]
  );

  const gridTemplate = "1fr 180px";

  return <ReusableTable columns={columns} data={rows} gridTemplate={gridTemplate} initialPageSize={5} />;
}
