import React from 'react';
import Link from 'next/link';
import Button from './button/Button';
import ProgressPill from './ProgressPill';

type Pill = { label: string; tone?: 'default' | 'muted' };

type StatCardProps = {
	title: string;
	value: string | number;
	delta?: string;
	pills?: Pill[];
	smallLabel?: string;
	smallValue?: string;
	ctaLabel?: string;
	ctaHref?: string;
	/** optional named icon key to render (safer to pass from server components) */
	iconName?: 'users' | 'products' | 'transactions' | 'supply';
	className?: string;
	/** show or hide the CTA button */
	showCta?: boolean;
	/** optional percent to render a progress pill */
	percent?: number;
};

export default function StatCard({
	title,
	value,
	delta,
	pills = [],
	smallLabel,
	smallValue,
	ctaLabel = 'View All',
	ctaHref,
	iconName,
	className = '',
	showCta = true,
	percent,
}: StatCardProps) {

	const renderIcon = (key?: string) => {
		const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };
		switch (key) {
			case 'users':
				return (
					<svg {...common} className="text-white" aria-hidden>
						<path d="M16 11a4 4 0 1 0-8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
						<path d="M3 21v-1a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
					</svg>
				);
			case 'products':
				return (
					<svg {...common} className="text-white" aria-hidden>
						<rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.2" fill="currentColor" />
						<path d="M16 3l-4 4-4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
					</svg>
				);
			case 'transactions':
				return (
					<svg {...common} className="text-white" aria-hidden>
						<path d="M12 1v22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M17 6H7a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
					</svg>
				);
			case 'supply':
				return (
					<svg {...common} className="text-white" aria-hidden>
						<path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
						<path d="M9 14l6-4" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				);
			default:
				return (
					<svg {...common} className="text-white" aria-hidden>
						<path d="M12 2L2 22h20L12 2z" fill="currentColor" />
					</svg>
				);
		}
	};
	return (
		<div className={["bg-green-50 rounded-lg p-6 shadow-sm transform transition-transform duration-150 ease-out hover:scale-[1.02] hover:shadow-md", className].filter(Boolean).join(' ')}>
			<div className="flex items-start justify-between">
				<div>
					<div className="flex items-center gap-3 text-sm text-gray-700">
						<div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center text-xs shrink-0">
							{renderIcon(iconName)}
						</div>
						<div className="font-medium">{title}</div>
					</div>

					<div className="mt-3 flex items-end gap-4">
						<div className="text-4xl font-bold text-gray-900 leading-none">{value}</div>
						{delta && <div className="text-sm text-green-600">{delta}</div>}
					</div>
				</div>
			</div>

			<div className="my-4 border-b border-green-600" />

			{/* Centered pills and small value, CTA centered and full-width */}
			<div className="text-center">
					<div className="mx-auto max-w-xs w-full mb-4">
						<div className="flex items-center gap-3">
						{smallValue ? (
							<>
								<div className="flex-none text-xs text-gray-400">{smallLabel}</div>
								{typeof percent === 'number' ? (
									<div className="flex-1 flex items-center gap-3">
										{/* left: small value capsule (equal width) */}
										<div className="flex-1 flex items-center justify-center">
											<div className="inline-flex items-center justify-center w-full rounded-full text-xs leading-none whitespace-nowrap px-4 py-2 text-green-700 border border-green-600 bg-green-50">
												{smallValue}
											</div>
										</div>
										{/* right: percent progress pill (equal width) */}
										<div className="flex-1">
											<ProgressPill percent={typeof percent === 'number' ? percent : 0} />
										</div>
									</div>
							) : (
									<div className="flex-1">
										<div className="inline-flex w-full items-center justify-center rounded-full text-xs leading-none whitespace-nowrap px-4 py-2 text-green-700 border border-green-600 bg-green-50">
											{smallValue}
										</div>
									</div>
								)}
							</>
						) : (
							<>
								{pills.map((p, i) => (
									<span key={i} className={[
										'flex-1 inline-flex items-center justify-center rounded-full text-xs leading-none whitespace-nowrap px-4 py-2 border bg-green-50 text-green-700 border-green-600'
									].join(' ')}>
										{p.label}
									</span>
								))}
							</>
						)}
						</div>
					</div>

				{showCta && (
					<div className="mx-auto max-w-xs">
						{ctaHref ? (
							<Link href={ctaHref} className="inline-block w-full">
								<Button variant="primary" className="w-full py-3 rounded-full">{ctaLabel}</Button>
							</Link>
						) : (
							<Button variant="primary" className="w-full py-3 rounded-full">{ctaLabel}</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

