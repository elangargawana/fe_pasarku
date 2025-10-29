"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/button/Button";

export default function Headbar() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	return (
		<header className="w-full bg-white border-b border-black/4 dark:border-white/6">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Brand */}
					<div className="flex items-center gap-3">
						<span className="w-8 h-8 text-green-600">
							<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
								<path d="M12 2L2 22h20L12 2z" />
							</svg>
						</span>
						<div>
							<div className="text-green-600 font-semibold tracking-wide">PASARKU</div>
						</div>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-3">
						{/* Large screen buttons */}
						<div className="hidden sm:flex items-center gap-3">
							<Button variant="primary" onClick={() => router.push('/auth/login')} className="min-w-[120px]">Login</Button>
							<Button variant="outline" onClick={() => router.push('/auth/register')} className="min-w-[120px]">Register</Button>
						</div>

						{/* Mobile hamburger */}
						<div className="sm:hidden relative">
							<button onClick={() => setOpen((s) => !s)} aria-label="Menu" aria-expanded={open} className="p-2 rounded-md transform transition hover:scale-105">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
							</button>

							{/* Mobile menu: simple focus trap and keyboard handling */}
							<div aria-hidden={!open}>
								{open && (
									<div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-sm rounded-md p-1 z-50 transform transition ease-out duration-150 origin-top-right" role="menu" aria-label="Mobile menu" onKeyDown={(e) => {
										if (e.key === 'Escape') setOpen(false);
										// simple tab trap: if only two items, loop focus
										if (e.key === 'Tab') {
											const focusable = Array.from((e.currentTarget as HTMLElement).querySelectorAll('button')) as HTMLElement[];
											if (focusable.length > 0) {
												const first = focusable[0];
												const last = focusable[focusable.length - 1];
												if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
												if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
											}
										}
									}}>
										<button onClick={() => { setOpen(false); router.push('/auth/login'); }} className="w-full text-left px-3 py-2 rounded-t-md hover:bg-gray-50 text-gray-700 transform transition hover:scale-105" role="menuitem">Login</button>
										<div className="border-t border-gray-100 my-0" />
										<button onClick={() => { setOpen(false); router.push('/auth/register'); }} className="w-full text-left px-3 py-2 rounded-b-md hover:bg-gray-50 text-gray-700 transform transition hover:scale-105" role="menuitem">Register</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Subtle mint strip */}
			<div className="w-full bg-green-50 h-8 mt-2"></div>
		</header>
	);
}
