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
					<div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4">
						{/* Left block: search on top (mobile), filters beside on md+ */}
						<div className="flex-1 w-full">
							<div className="flex flex-col sm:flex-row sm:items-center gap-3">
								{/* Search sits above filters on small screens */}
								<div className="w-full sm:flex-1">
									<SearchInput value={query} onChange={setQuery} onSearch={() => {}} placeholder="Cari Pedagang" className="w-full md:max-w-md" />
								</div>

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
						</div>

						{/* Right block: action buttons */}
						<div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
							{/* Download: small pill on mobile (centered), inline on sm+ */}
							<button className="w-full sm:w-auto text-center px-3 py-2 rounded-full border border-green-600 text-green-600 text-sm hover:bg-green-50 transition shadow-sm sm:min-w-28">
								Download List
							</button>

							{/* Add: full-width on mobile, large pill on tablet/desktop */}
							<button className="w-full sm:w-auto px-4 py-3 rounded-full bg-green-600 text-white text-sm flex items-center gap-2 justify-center hover:bg-green-700 transition shadow sm:min-w-40">
								<svg className="w-4 h-4 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
								<span className="leading-tight">Tambah Pedagang Manual</span>
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
