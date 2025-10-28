"use client";

import React from "react";
import ApprovalTablePedagang from "./ApprovalTablePedagang";
import Button from "../../ui/Button";
import ConfirmDialog from "../../ui/ConfirmDialog";

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
	// Make filter buttons idempotent: selecting a filter sets it, and
	// clicking again keeps it selected instead of toggling to null.
	const toggle = (id: Id) => setActive(id);

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
			// Keep the clicked filter active (idempotent). Also keep the
			// transient click animation behavior.
			setActive(id);
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

		const [selectedCount, setSelectedCount] = React.useState(0);
		const [selectedIdsSet, setSelectedIdsSet] = React.useState<Set<string|number>>(new Set());
		const [hasActiveSelected, setHasActiveSelected] = React.useState(false);
		const [clearSignal, setClearSignal] = React.useState(0);

			const handleSelectionChange = React.useCallback((ids: Set<string | number>, hasActive?: boolean) => {
				setSelectedCount(ids.size);
				setSelectedIdsSet(new Set(ids));
				setHasActiveSelected(Boolean(hasActive));
			}, []);

		const toolbarVisible = selectedCount > 0;

		// confirm dialog state
		const [confirmOpen, setConfirmOpen] = React.useState(false);
		const [confirmAction, setConfirmAction] = React.useState<"approve" | "reject" | null>(null);

		const openConfirm = (action: "approve" | "reject") => {
			setConfirmAction(action);
			setConfirmOpen(true);
		};

		const closeConfirm = () => {
			// Close the dialog (start fade-out). We intentionally DO NOT clear
			// `confirmAction` immediately so the dialog can keep showing the
			// correct labels while its fade-out transition runs.
			setConfirmOpen(false);
		};

		// After the dialog finishes its fade-out we can safely clear the
		// `confirmAction`. The ConfirmDialog uses a 200ms fade duration, so
		// clear a little after that. If the dialog re-opens before the
		// timeout fires, the timeout will be cleared by the effect cleanup.
		React.useEffect(() => {
			let t: number | undefined;
			if (!confirmOpen && confirmAction !== null) {
				t = window.setTimeout(() => setConfirmAction(null), 240);
			}
			return () => {
				if (t) window.clearTimeout(t);
			};
		}, [confirmOpen, confirmAction]);

		const onConfirmAction = () => {
			// placeholder action: call API here
			console.log(`${confirmAction === 'approve' ? 'Approve' : 'Reject'} items:`, Array.from(selectedIdsSet));

			// clear selection in child table by bumping clearSignal
			setClearSignal((s) => s + 1);
			// reset local toolbar state
			setSelectedCount(0);
			setSelectedIdsSet(new Set());
			setHasActiveSelected(false);
			closeConfirm();
		};

		return (
		<div className="bg-green-50 rounded-lg p-6 shadow-sm">
			{/* Filter buttons */}
			<div className="w-full">
				<div className="flex gap-4 w-full flex-wrap sm:flex-nowrap">
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
								className={`relative overflow-hidden flex-1 min-w-28 sm:min-w-0 flex items-center justify-center gap-2 sm:gap-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-150 bg-green-50 text-green-700 border border-green-600 hover:bg-green-100 active:scale-95`}
							>
								<span className="pointer-events-none relative z-10">{labels[id]}</span>
								<span className="ml-2 bg-amber-400 text-white text-xs font-medium rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center relative z-10">
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
				<div
					className={`mt-4 transition-all duration-300 ease-out ${
						toolbarVisible
							? "opacity-100 translate-y-0 max-h-40 pointer-events-auto"
							: "opacity-0 -translate-y-2 max-h-0 pointer-events-none overflow-hidden"
					}`}
					aria-hidden={!toolbarVisible}
				>
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-3">
							<div className="text-xs sm:text-sm font-medium whitespace-nowrap">
								{selectedCount} Produk Dipilih
							</div>

							{/* Tombol-tombol di sebelah kanan */}
							<div className="flex items-center gap-2 flex-wrap">
								<Button
									variant="outline"
									disabled={hasActiveSelected}
									onClick={() => openConfirm('approve')}
									className={`transform transition-all duration-200 sm:min-w-28 h-7 sm:h-8 flex items-center justify-center px-2 sm:px-3 rounded-full bg-white text-green-600 border border-green-600 text-xs sm:text-sm hover:bg-green-100 hover:border-green-700 hover:text-green-700 hover:scale-100 ${
									toolbarVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
								} ${hasActiveSelected ? 'opacity-50 pointer-events-none' : ''}`}
								>
									Disetujui
								</Button>

								<Button
									variant="outline"
									disabled={hasActiveSelected}
									onClick={() => openConfirm('reject')}
									className={`transform transition-all duration-200 sm:min-w-28 h-7 sm:h-8 flex items-center justify-center px-2 sm:px-3 rounded-full bg-white text-red-600 border border-red-500 text-xs sm:text-sm hover:bg-red-100 hover:border-red-600 hover:text-red-600 hover:scale-100 ${
									toolbarVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
								} ${hasActiveSelected ? 'opacity-50 pointer-events-none' : ''}`}
								>
										Ditolak
								</Button>

								<Button
									variant="outline"
									className={`transform transition-all duration-200 sm:min-w-28 h-7 sm:h-8 flex items-center justify-center px-2 sm:px-3 rounded-full bg-white text-green-600 border border-green-600 text-xs sm:text-sm hover:bg-green-100 hover:border-green-700 hover:text-green-700 hover:scale-100 ${
									toolbarVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
								}`}
								>
										Export List
								</Button>
							</div>
						</div>
					</div>
				</div>

			{/* Table */}
			<div className="mt-4">
				<ApprovalTablePedagang
					onSelectionChange={handleSelectionChange}
					statusFilter={
						active === "active" ? "Aktif" : active === "pending" ? "Pending" : null
					}
					clearSelectionSignal={clearSignal}
				/>
			</div>

			{/* Confirm dialog for approve/reject actions */}
			<ConfirmDialog
				open={confirmOpen}
				title={confirmAction === 'approve' ? 'Konfirmasi Setujui' : 'Konfirmasi Tolak'}
				description={`Anda yakin ingin ${confirmAction === 'approve' ? 'menyetujui' : 'menolak'} ${selectedCount} produk terpilih?`}
				confirmLabel={confirmAction === 'approve' ? 'Ya, Setujui' : 'Ya, Tolak'}
				cancelLabel="Batal"
				onConfirm={onConfirmAction}
				onCancel={closeConfirm}
				confirmClassName={confirmAction === 'approve' ? 'px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transform transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-green-300' : undefined}
				cancelClassName={confirmAction === 'approve' ? 'px-4 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-50 transform transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-red-300' : undefined}
			/>
		</div>
	);
}
