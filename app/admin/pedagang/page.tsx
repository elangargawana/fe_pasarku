"use client";

import React from "react";
import SearchInput from "../../../components/ui/SearchInput";
import Select from "../../../components/ui/Select";
import ApprovalCardPedagang from '../../../components/admin/approvalspedagang/ApprovalCardPedagang';

export default function PedagangPage() {
	const [query, setQuery] = React.useState("");
	const [komoditas, setKomoditas] = React.useState("");

	const resetFilters = () => {
		setQuery("");
		setKomoditas("");
	};

	return (
		<div className="py-8">
			<div className="max-w-8xl mx-auto">
				{/* Header row */}
					<div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
						<div className="flex items-center gap-3 flex-1 w-full">
							<SearchInput value={query} onChange={setQuery} onSearch={() => {}} placeholder="Cari Pedagang" className="w-full md:max-w-md" />

							<div className="flex items-center gap-2">
								<Select
									value={komoditas}
									onChange={setKomoditas}
									options={[{ value: "sayur", label: "Sayur" }, { value: "ikan", label: "Ikan" }, { value: "buah", label: "Buah" }]}
									className="min-w-40"
									placeholder="Filter Komoditas"
								/>

								<button onClick={resetFilters} className="text-sm text-gray-500 hover:underline">Reset Filter</button>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<button className="px-3 py-2 rounded-full border border-green-600 text-green-600 text-sm hover:bg-green-50 transition shadow-sm">Download List</button>

							<button className="px-4 py-2 rounded-full bg-green-600 text-white text-sm flex items-center gap-2 hover:bg-green-700 transition shadow">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
								Tambah Pedagang Manual
							</button>
						</div>
					</div>
				</div>
				<h1 className="text-2xl font-semibold mb-6 mt-6">Memerlukan Persetujuan</h1>
				<div className="max-w-8xl mx-auto mb-6">
									<ApprovalCardPedagang />
								</div>
			</div>
	);
}
