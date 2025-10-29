"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../ui/button/Button";
import ReusableTable from "../../ui/ReusableTable";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend removed — we'll render a custom legend to control layout
} from "recharts";

// Extract performance panel into its own component so Hooks are not called
// conditionally inside ActiveDetail (prevents Rules of Hooks errors).
function PerformancePanel() {
  // sample multi-series data per day (colors chosen to match app palette)
  const chartData = [
    { day: 'Senin', Minyak: 12, Beras: 60, BawangMerah: 20, BawangPutih: 8, CabaiMerah: 44, Lainnya: 6 },
    { day: 'Selasa', Minyak: 6, Beras: 80, BawangMerah: 44, BawangPutih: 30, CabaiMerah: 52, Lainnya: 12 },
    { day: 'Rabu', Minyak: 20, Beras: 90, BawangMerah: 58, BawangPutih: 10, CabaiMerah: 98, Lainnya: 20 },
    { day: 'Kamis', Minyak: 8, Beras: 40, BawangMerah: 32, BawangPutih: 14, CabaiMerah: 60, Lainnya: 16 },
    { day: 'Jumat', Minyak: 24, Beras: 70, BawangMerah: 44, BawangPutih: 18, CabaiMerah: 72, Lainnya: 24 },
    { day: 'Sabtu', Minyak: 18, Beras: 50, BawangMerah: 36, BawangPutih: 80, CabaiMerah: 20, Lainnya: 30 },
    { day: 'Minggu', Minyak: 28, Beras: 98, BawangMerah: 48, BawangPutih: 92, CabaiMerah: 100, Lainnya: 40 },
  ];

  const [width, setWidth] = useState<number>(typeof window === 'undefined' ? 1200 : window.innerWidth);
  useEffect(() => {
    function onResize() { setWidth(window.innerWidth); }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isSmall = width < 640;
  const chartHeight = isSmall ? 220 : 320;

  const series = [
    { key: 'Minyak', label: 'Minyak', color: '#6366F1' },
    { key: 'Beras', label: 'Beras', color: '#F97316' },
    { key: 'BawangMerah', label: 'BawangMerah', color: '#FB7185' },
    { key: 'BawangPutih', label: 'BawangPutih', color: '#FBBF24' },
    { key: 'CabaiMerah', label: 'CabaiMerah', color: '#34D399' },
    { key: 'Lainnya', label: 'Lainnya', color: '#60A5FA' },
  ];

  // short day names for mobile
  const shortDay: Record<string, string> = {
    Senin: 'Sen',
    Selasa: 'Sel',
    Rabu: 'Rab',
    Kamis: 'Kam',
    Jumat: 'Jum',
    Sabtu: 'Sab',
    Minggu: 'Min',
  };

  return (
    <div className="space-y-4">
      {/* Top stat cards: two large */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-md bg-emerald-50 p-4">
          <div className="text-sm text-slate-600">Total Transaksi</div>
          <div className="text-2xl font-bold text-slate-800">85 <span className="text-sm font-normal text-slate-500">(30 Hari Terakhir)</span></div>
        </div>

        <div className="rounded-md bg-emerald-50 p-4">
          <div className="text-sm text-slate-600">Total Pendapatan</div>
          <div className="text-2xl font-bold text-slate-800">Rp 3.5 Jt</div>
        </div>
      </div>

      {/* Three small stat chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-md bg-emerald-50 p-4">
          <div className="text-sm text-slate-600">Rating</div>
          <div className="text-xl font-bold text-slate-800">4.8 <span className="text-sm font-normal text-slate-500">(125)</span></div>
        </div>
        <div className="rounded-md bg-emerald-50 p-4">
          <div className="text-sm text-slate-600">Response Rate</div>
          <div className="text-xl font-bold text-slate-800">98%</div>
        </div>
        <div className="rounded-md bg-emerald-50 p-4">
          <div className="text-sm text-slate-600">Completion Rate</div>
          <div className="text-xl font-bold text-slate-800">99%</div>
        </div>
      </div>

      {/* Chart panel */}
      <div className="rounded-md border border-slate-100 p-4 bg-white">
        <h5 className="text-base font-semibold mb-3">5 Produk Terlaris (7 Hari Terakhir)</h5>

        <div className="p-4 rounded-md bg-emerald-50">
          {/* custom legend: centered, wrapped, neat spacing */}
          <div className="flex flex-wrap gap-4 justify-center items-center mb-3">
            {series.map((s) => (
              <div key={s.key} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="inline-block w-4 h-4 rounded-sm" style={{ background: s.color }} />
                <span className="whitespace-nowrap">{s.label}</span>
              </div>
            ))}
          </div>

          <div style={{ width: '100%', height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -23, bottom: 8 }}
                barGap={2}
                barCategoryGap={isSmall ? '20%' : '10%'}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.45} />
                <XAxis dataKey="day" tick={{ fill: '#374151', fontSize: isSmall ? 11 : 13 }} tickFormatter={(value: string | number) => String(isSmall ? (shortDay[String(value)] ?? value) : value)} />
                <YAxis tick={{ fill: '#374151', fontSize: isSmall ? 11 : 13 }} />
                <Tooltip />

                <Bar dataKey="Minyak" stackId="a" fill="#6366F1" />
                <Bar dataKey="Beras" stackId="a" fill="#F97316" />
                <Bar dataKey="BawangMerah" stackId="a" fill="#FB7185" />
                <Bar dataKey="BawangPutih" stackId="a" fill="#FBBF24" />
                <Bar dataKey="CabaiMerah" stackId="a" fill="#34D399" />
                <Bar dataKey="Lainnya" stackId="a" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  data?: { photo?: string; nama?: string; reviews?: unknown };
  onClose?: () => void;
};

// Active status detail content: render the pill-style header tabs
export default function ActiveDetail({ data, onClose }: Props) {
  const [active, setActive] = React.useState<'profile' | 'product' | 'performance' | 'review'>('profile');

  const tabs: { id: typeof active; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'product', label: 'Product' },
    { id: 'performance', label: 'Performance' },
    { id: 'review', label: 'Review' },
  ];

  return (
    <div className="w-full">

      <nav aria-label="detail-tabs" className="mb-6">
        {/* mobile: render pills in 2-cols grid (compact), sm+: horizontal flex with equal widths */}
        <ul className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <li key={t.id} className="col-span-1 sm:flex-1">
                <button
                  type="button"
                  onClick={() => setActive(t.id)}
                  className={`inline-flex w-full h-9 sm:h-10 leading-none justify-center items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-green-200 border border-green-300 text-green-700'
                        : 'bg-white border border-green-200 text-green-600 hover:bg-green-100 hover:border-green-300'
                    } whitespace-nowrap`}
                >
                  <span className="truncate">{t.label}</span>

                  {t.id === 'product' && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-amber-400 text-white">28</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Scrollable content area containing per-tab content */}
      <div className="mt-2">
        <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-6">
          {/* Render content according to active tab */}
          {active === 'profile' && (
            <>
              {/* Personal information card (matches mock: avatar left, labels/values right) */}
              <div className="rounded-md border border-slate-100 p-4 bg-white">
                <h5 className="text-base font-semibold mb-4">Personal Information</h5>

                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="shrink-0">
                    {/* smaller avatar on mobile, normal on sm+ */}
                    <Image src={data?.photo ?? '/file.svg'} alt={data?.nama ?? 'foto pedagang'} width={112} height={112} className="w-20 h-20 sm:w-28 sm:h-28 rounded-md object-cover" />
                  </div>

                  <div className="flex-1 w-full">
                    {/* stack into single column on small screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 items-start">
                      <div className="text-sm text-gray-500">Full Name</div>
                      <div className="text-sm font-medium">Siti Aminah</div>

                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-sm font-medium">081234567890</div>

                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-sm font-medium">siti@example.com</div>

                      <div className="text-sm text-gray-500">Alamat</div>
                      <div className="text-sm font-medium">Jl. Melati No. 45, Semarang</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business information card */}
              <div className="rounded-md border border-slate-100 p-4 bg-white">
                <h5 className="text-base font-semibold mb-4">Business Information</h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
                  <div className="text-sm text-gray-500">Merchant Name</div>
                  <div className="font-medium">Toko Bu Siti</div>

                  <div className="text-sm text-gray-500">Kios Number</div>
                  <div className="font-medium">A-12</div>

                  <div className="text-sm text-gray-500">Kategori</div>
                  <div className="font-medium">Sayuran & Buah</div>

                  <div className="text-sm text-gray-500">Operating Hour</div>
                  <div className="font-medium">05:00 - 17:00</div>

                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="font-medium">15 Jan 2025</div>
                </div>
              </div>

              {/* Documents section */}
              <div className="rounded-md border border-slate-100 p-4 bg-white">
                <h5 className="text-base font-semibold mb-4">Document</h5>

                <div className="space-y-6">
                  {[
                    { label: 'KTP', img: '/file.svg' },
                    { label: 'SIUP', img: '/file.svg' },
                    { label: 'Surat Keterangan', img: '/file.svg' },
                  ].map((d) => (
                    <div key={d.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-full sm:w-36 text-sm text-gray-500">{d.label}</div>

                      <div className="w-full sm:w-40 h-40 sm:h-24 rounded-md overflow-hidden border relative">
                        <Image src={d.img} alt={d.label} width={160} height={160} className="w-full h-full object-cover" />

                        {/* centered view icon overlay (placeholder for full-view action) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            aria-label={`Lihat ${d.label}`}
                            title="Lihat gambar"
                            className="inline-flex items-center justify-center bg-white/75 hover:bg-white/95 text-slate-700 hover:text-slate-900 rounded-full p-2 shadow-sm transition transform duration-150 hover:scale-110 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* push the verified label to the end on larger screens, on mobile it sits below */}
                      <div className="sm:ml-auto mt-2 sm:mt-0 flex items-center text-green-600 font-medium gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Verifikasi</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {active === 'product' && (() => {
            type Prod = { komoditas: string; harga: string; stok: string };
            const rows: Prod[] = [
              { komoditas: 'Sawi', harga: 'Rp 15.000', stok: '2 ikat' },
              { komoditas: 'Sawi', harga: 'Rp 15.000', stok: '2 ikat' },
              { komoditas: 'Sawi', harga: 'Rp 15.000', stok: '2 ikat' },
              { komoditas: 'Sawi', harga: 'Rp 15.000', stok: '2 ikat' },
              { komoditas: 'Sawi', harga: 'Rp 15.000', stok: '2 ikat' },
            ];

            const columnHelper = createColumnHelper<Prod>();
            const columns = [
              columnHelper.accessor('komoditas', { header: 'Komoditas', cell: info => <div className="text-sm text-slate-700">{info.getValue()}</div> }),
              columnHelper.accessor('harga', { header: 'Harga', cell: info => <div className="text-sm text-slate-700">{info.getValue()}</div> }),
              columnHelper.accessor('stok', { header: 'Stok', cell: info => <div className="text-sm text-slate-700">{info.getValue()}</div> }),
            ];

            return (
              <div className="rounded-md border border-slate-100 p-0 bg-white">
                <div className="px-4 py-3">
                  <h5 className="text-base font-semibold">List Produk</h5>
                </div>

                <ReusableTable columns={columns} data={rows} gridTemplate="1fr 160px 120px" initialPageSize={5} hidePagination />

                <div className="px-4 py-4">
                  <Button variant="success" className="w-full rounded-full">
                    View All
                  </Button>
                </div>
              </div>
            );
          })()}

          {active === 'performance' && <PerformancePanel />}

          {active === 'review' && (() => {
            type Review = { namaProduk: string; rating: number; komentar: string };

            const sampleReviews: Review[] = [
              { namaProduk: 'Sawi', rating: 4, komentar: 'Beberapa ikat tak segar' },
              { namaProduk: 'Sawi', rating: 5, komentar: 'Sawi sangat segar' },
              { namaProduk: 'Sawi', rating: 4, komentar: 'Beberapa ikat tak segar' },
              { namaProduk: 'Sawi', rating: 3, komentar: 'Saya mendapatkan sawi yang terdapat ulat nya' },
              { namaProduk: 'Sawi', rating: 5, komentar: 'Pengiriman cepat, bagus' },
            ];

            const reviews: Review[] = ((data?.reviews as Review[]) ?? sampleReviews).slice(0, 5);

            const columnHelper = createColumnHelper<Review>();
            const columns = [
              columnHelper.accessor('namaProduk', {
                header: 'Nama Produk',
                cell: info => <div className="text-sm text-slate-700">{info.getValue()}</div>,
              }),
              columnHelper.accessor('rating', {
                header: 'Rating',
                cell: info => (
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.393 2.708c-.784.57-1.839-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.611 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.049 2.927z" />
                    </svg>
                    <span className="font-medium">{info.getValue()}</span>
                  </div>
                ),
              }),
              columnHelper.accessor('komentar', {
                header: 'Komentar',
                cell: info => <div className="text-sm text-slate-700">{info.getValue()}</div>,
              }),
            ];

            return (
              <div className="rounded-md border border-slate-100 p-0 bg-white">
                <div className="px-4 py-3">
                  <h5 className="text-base font-semibold">Recent Review</h5>
                </div>

                <ReusableTable columns={columns} data={reviews} gridTemplate="1fr 120px 2fr" initialPageSize={5} hidePagination />
              </div>
            );
          })()}
        </div>

        {/* Footer actions (outside the scrollable area) - layout like PendingDetail but keep outline style and avoid wrapping */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <Button
            variant="outline"
            className="px-4 py-2 rounded-full text-xs font-medium max-w-xs w-52 whitespace-nowrap border-green-300 bg-white text-green-700"
          >
            Edit Profile
          </Button>

          <Button
            variant="outline"
            className="px-4 py-2 rounded-full text-xs font-medium max-w-xs w-52 whitespace-nowrap border-red-300 bg-white text-red-600"
          >
            Suspend
          </Button>

          <Button
            variant="outline"
            onClick={() => onClose?.()}
            className="px-4 py-2 rounded-full text-xs font-medium max-w-xs w-52 whitespace-nowrap border-green-300 bg-white text-green-700"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
