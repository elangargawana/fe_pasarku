"use client";

import React, { useState } from "react";
import Button from "../../../components/ui/button/Button";
import StatCard from "../../../components/ui/StatCard";
import Select from "../../../components/ui/Select";
import ActivitiesCardLogging from "@/components/admin/activities_logging/ActivitiesCardLogging";
import LogPasokanModal from "@/components/admin/activities_logging/LogPasokanModal";
import DateTimeBadge from "../../../components/ui/DateTimeBadge";

export default function PencatatanPasokanPage() {
  const today = new Date();
  const formatted = today.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // state untuk dropdown filter
    const [commodity, setCommodity] = useState("");
    const [supplier, setSupplier] = useState("");
    // modal state for adding supply
    const [modalOpen, setModalOpen] = useState(false);

  const handleReset = () => {
      setCommodity("");
      setSupplier("");
  };

  return (
    <div className="py-8">
      <div className="max-w-8xl mx-auto">
        {/* Top controls: actions (left) and filters (right) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          {/* Aksi kiri: stack on mobile, inline on desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-full justify-center"
              onClick={() => setModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Pasokan
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto inline-flex items-center gap-2 px-3 py-2 rounded-full justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v14m7-7H5"
                />
              </svg>
              Download List
            </Button>
          </div>

          {/* Filter kanan: selects stay side-by-side on mobile; Reset appears underneath (left-aligned) on mobile */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-row flex-nowrap items-center gap-5 w-full sm:w-auto">
              {/* Komoditas */}
              <Select
                value={commodity}
                onChange={setCommodity}
                options={[
                  { value: "sayur", label: "Sayuran" },
                  { value: "buah", label: "Buah" },
                ]}
                placeholder="Semua Komoditas"
                className="min-w-0"
              />

              {/* Supplier */}
              <Select
                value={supplier}
                onChange={setSupplier}
                options={[
                  { value: "supplier-a", label: "Supplier A" },
                  { value: "supplier-b", label: "Supplier B" },
                ]}
                placeholder="Semua Supplier"
                className="min-w-0"
              />
            </div>

            {/* Reset Filter - on mobile this will be below selects and left-aligned; on desktop it stays inline */}
            <div className="w-full sm:w-auto">
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
  {/* Log Pasokan Modal */}
  <LogPasokanModal open={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Heading dengan tanggal */}
        <div className="flex items-center justify-between mb-6 mt-6">
          <h1 className="text-2xl font-semibold">Aktivitas Pasokan</h1>

          <DateTimeBadge />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Total Supply"
            value={28}
            delta="15 Menit yang lalu"
            smallLabel="Total Weight"
            smallValue="450 kg"
            iconName="supply"
            showCta={false}
          />

          <StatCard
            title="Top Komoditas"
            value="Sayuran"
            smallLabel="Total Weight"
            smallValue="450 kg"
            iconName="products"
            percent={60}
            showCta={false}
          />

          <StatCard
            title="Suppliers Aktif"
            value={12}
            delta="+2 Hari ini"
            smallLabel="Total Suppliers"
            smallValue="68"
            iconName="users"
            showCta={false}
          />
        </div>
                <div className="max-w-8xl mx-auto mb-6">
                          <ActivitiesCardLogging />
                        </div>
      </div>
    </div>
  );
}
