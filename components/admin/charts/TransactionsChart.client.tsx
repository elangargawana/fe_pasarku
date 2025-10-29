"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatRupiah, formatCompactRupiah } from "../../../lib/formatCurrency";

const data = [
  { day: "Senin", count: 20, revenue: 3200000 },
  { day: "Selasa", count: 10, revenue: 1600000 },
  { day: "Rabu", count: 6, revenue: 900000 },
  { day: "Kamis", count: 6, revenue: 1200000 },
  { day: "Jumat", count: 25, revenue: 4200000 },
  { day: "Sabtu", count: 9, revenue: 1800000 },
  { day: "Minggu", count: 15, revenue: 2500000 },
];

function currencyFormatRp(v: number) {
  return formatCompactRupiah(Number(v));
}

export default function TransactionsChartClient() {
  const [width, setWidth] = useState<number>(typeof window === "undefined" ? 1200 : window.innerWidth);

  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isSmall = width < 640; // mobile
  const isTablet = width >= 640 && width < 1024;

  const shortDay = (d: string) => {
    const map: Record<string, string> = {
      Senin: "Sen",
      Selasa: "Sel",
      Rabu: "Rab",
      Kamis: "Kamis",
      Jumat: "Jum",
      Sabtu: "Sab",
      Minggu: "Min",
    };
    return map[d] ?? d;
  };

  const marginTop = isSmall ? 20 : isTablet ? 20 : 10;
  const rightMargin = isSmall ? -10 : isTablet ? -10 : 40;
  const leftMargin = isSmall ? -10 : isTablet ? -10 : 20;

  // explicit height on small/tablet so the ResponsiveContainer has a definite pixel height
  const responsiveHeight = isSmall ? 200 : isTablet ? 240 : "100%";

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={responsiveHeight}>
        <LineChart data={data} margin={{ top: marginTop, right: rightMargin, left: leftMargin, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.6} />

          <XAxis
            dataKey="day"
            tick={{ fill: "#4B5563", fontSize: isSmall ? 11 : 12 }}
            padding={{ left: isSmall ? 0 : 20, right: isSmall ? 0 : 20 }}
            tickFormatter={(v) => (isSmall || isTablet ? shortDay(String(v)) : String(v))}
            interval={0}
          />

          <YAxis yAxisId="left" allowDecimals={false} domain={[0, 40]} tick={{ fill: "#6366F1", fontSize: isSmall ? 10 : 12 }} />

          <YAxis yAxisId="right" orientation="right" tickFormatter={currencyFormatRp} tick={{ fill: "#10B981", fontSize: isSmall ? 10 : 12 }} domain={[0, 5000000]} />

          <Tooltip
            formatter={(value: any, name?: string) => {
              const label = (name ?? "").toString();
              const lower = label.toLowerCase();
              if (lower.includes("revenue")) return [formatRupiah(Number(value)), "Revenue"];
              if (lower.includes("count") || lower.includes("transaction")) return [value, "Transaction Count"];
              return [value, label];
            }}
          />

          {/* Custom legend: hollow stroked-circle icons to match design */}
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{ top: 6, fontSize: isSmall ? 12 : 14, paddingBottom: 6 }}
            content={(props: any) => {
              const { payload } = props || {};
              if (!payload || !Array.isArray(payload)) return null;
              return (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 18, alignItems: 'center', marginTop: 6 }}>
                  {payload.map((entry: any, idx: number) => (
                    <div key={(entry?.value ?? '') + idx} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#374151' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="9" cy="9" r="6" fill="#fff" stroke={entry.color} strokeWidth={2} />
                      </svg>
                      <span style={{ fontSize: isSmall ? 12 : 14 }}>{entry.value}</span>
                    </div>
                  ))}
                </div>
              );
            }}
          />

          <Line yAxisId="left" type="monotone" dataKey="count" name="Transaction Count" stroke="#3B82F6" strokeWidth={isSmall ? 1.6 : 2} dot={{ r: isSmall ? 2 : 4 }} activeDot={{ r: isSmall ? 4 : 6 }} opacity={0.95} />

          <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="#10B981" strokeWidth={isSmall ? 1.6 : 2} dot={{ r: isSmall ? 2 : 4 }} activeDot={{ r: isSmall ? 4 : 6 }} opacity={0.95} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
