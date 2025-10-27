"use client";

import React from "react";

export default function ApprovalCardPedagang() {
	const ids = ["all", "active", "pending"] as const;
	type Id = (typeof ids)[number];
	const labels: Record<Id, string> = {
		all: "Semua",
		active: "Aktif",
		pending: "Pending Verifikasi",
	};
	const counts: Record<Id, number> = { all: 85, active: 80, pending: 5 };

	const [active, setActive] = React.useState<Id | null>("all");
	const toggle = (id: Id) => setActive((prev) => (prev === id ? null : id));

	// transient click indicator: slide overlay left->right across button
	const [clicked, setClicked] = React.useState<Id | null>(null);
	const [phase, setPhase] = React.useState<"idle" | "in" | "out">("idle");
	const enterMs = 200;
	const holdMs = 300;
	const exitMs = 200; // total 700ms
	const timeouts = React.useRef<number[]>([]);

	const clearAllTimeouts = () => {
		timeouts.current.forEach((t) => window.clearTimeout(t));
		timeouts.current = [];
	};

	const handleClick = (id: Id) => {
		toggle(id);
		setClicked(id);
		setPhase("in");
		clearAllTimeouts();
		// schedule exit after enter+hold
		timeouts.current.push(window.setTimeout(() => setPhase("out"), enterMs + holdMs));
		// cleanup clicked after total duration
		timeouts.current.push(window.setTimeout(() => {
			setClicked(null);
			setPhase("idle");
		}, enterMs + holdMs + exitMs));
	};

	React.useEffect(() => {
		return () => {
			clearAllTimeouts();
		};
	}, []);

	return (
		<div className="bg-green-50 rounded-lg p-6 shadow-sm">
			{/* Filter buttons */}
			<div className="w-full">
				<div className="flex gap-4 w-full">
					{ids.map((id) => {
						// Keep visual appearance identical whether the button is selected or not.
						// Selection state is preserved (aria-pressed) for logic only.
						const selected = active === id;
						const justClicked = clicked === id;
						// ensure the slide overlay only animates for the clicked button
						const isAnimating = clicked === id;
						const translateClass = isAnimating
							? phase === "in"
								? "translate-x-0"
								: phase === "out"
								? "translate-x-full"
								: "-translate-x-full"
							: "-translate-x-full";
						const opacityClass = isAnimating ? "opacity-95" : "opacity-0";
						return (
							<button
								key={id}
								type="button"
								aria-pressed={selected}
								onClick={() => handleClick(id)}
								className={`relative overflow-hidden flex-1 flex items-center justify-center gap-3 py-2 rounded-full text-sm font-medium transition-colors duration-150 bg-green-50 text-green-700 border border-green-600 hover:bg-green-100 active:scale-95`}
							>
								<span className="pointer-events-none relative z-10">{labels[id]}</span>
								<span className="ml-2 bg-amber-400 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center relative z-10">
									{counts[id]}
								</span>
								{/* sliding full-bg overlay: translate from -full -> 0 -> full */}
								<span
									className={`absolute inset-0 rounded-full bg-green-200 pointer-events-none z-0 transform transition-transform duration-200 ease-out ${translateClass} ${opacityClass}`}
								/>
							</button>
						);
					})}
				</div>
			</div>

			{/* Toolbar row */}
			<div className="mt-4 flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className="text-sm font-medium whitespace-nowrap">
						3 Produk Dipilih
					</div>

					{/* Tombol-tombol di sebelah kanan */}
					<div className="flex items-center gap-2">
						<button className="px-3 py-1 rounded-full bg-white text-green-600 border border-green-600 text-sm transition-colors duration-150 hover:bg-gray-100">
							Disetujui
						</button>
						<button className="px-3 py-1 rounded-full bg-white text-red-600 border border-red-500 text-sm transition-colors duration-150 hover:bg-gray-100">
							Ditolak
						</button>
						<button className="px-3 py-1 rounded-full bg-white text-green-600 border border-green-600 text-sm transition-colors duration-150 hover:bg-gray-100">
							Export List
						</button>
					</div>
				</div>
			</div>

			{/* Table placeholder */}
			<div className="mt-4 min-h-40 border border-dashed border-gray-100 rounded-lg bg-gray-50 flex items-center justify-center">
				<div className="text-sm text-gray-500">
					Tabel akan ditempatkan di sini
				</div>
			</div>
		</div>
	);
}
