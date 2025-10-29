import React from "react";
// Import the client-only implementation directly. This file is a server
// component (no "use client"), and importing a client component creates a
// client boundary — Next will hydrate the client component on the browser.
import TransactionsChartClient from "./TransactionsChart.client";

export default function TransactionsChart() {
  return <TransactionsChartClient />;
}
