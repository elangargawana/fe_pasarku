"use client";

import React from "react";
import ActivitiesTable from "./ActivitiesTable";

type Props = {
  title?: string;
  className?: string;
};

export default function ActivitiesCard({ title = "Aktivitas Terbaru", className = "" }: Props) {
  return (
    <div className={["bg-green-50 rounded-lg p-6 shadow-sm", className].filter(Boolean).join(" ")}>

      <div>
        <ActivitiesTable />
      </div>
    </div>
  );
}
