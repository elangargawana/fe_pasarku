import React from "react";
import ActivitiesTableLogging from "./ActivitiesTableLogging";

type Props = {
  title?: string;
  className?: string;
};

export default function ActivitiesCardLogging({ title = "Aktivitas Terbaru", className = "" }: Props) {
  return (
    <div className={["bg-green-50 rounded-lg p-6 shadow-sm", className].filter(Boolean).join(" ")}>

      <div>
        <ActivitiesTableLogging />
      </div>
    </div>
  );
}