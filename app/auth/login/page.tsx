
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Headbar from "../../../components/Headbar";
import Button from "../../../components/ui/button/Button";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	function handleSubmit(ev: React.FormEvent) {
		ev.preventDefault();
		setError(null);

		// static admin check (demo only)
		if (email.trim() === "admin@pasarku.test" && password === "admin123") {
			router.push("/admin/dashboard");
			return;
		}

		setError("Email atau password salah.");
	}

	return (
		<div className="min-h-screen bg-green-50">
			<Headbar />

			<main className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col md:flex-row gap-0 items-stretch">
							<div className="bg-white rounded-xl shadow-soft shadow-xl w-full overflow-hidden flex md:flex-row flex-col">
						{/* Left: promo (hidden on small screens) */}
						<div className="hidden md:flex md:w-1/2 p-6 sm:p-8 items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
									<div className="max-w-lg">
										<h1 className="text-3xl sm:text-4xl font-extrabold text-green-600">Selamat Datang di Pasarku</h1>
										<p className="text-gray-600 mt-4">
											Platform jual beli lokal yang aman dan cepat. Login untuk mulai bertransaksi atau daftar jika Anda belum punya akun.
										</p>
									</div>
								</div>

								{/* Right: form */}
								<div className="w-full md:w-1/2 p-6 sm:p-8">
									<h2 className="text-2xl font-bold mb-2">Login</h2>
									<p className="text-sm text-gray-600 mb-6">
										Pengguna baru? <a href="/auth/register" className="text-green-600 font-medium">Register</a>
									</p>

									<form className="space-y-4" onSubmit={handleSubmit}>
													<div>
														<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Masukan Email</label>
														<div className="relative">
															<span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
																<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
																	<path d="M3 8.5l9 6 9-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
																	<rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
																</svg>
															</span>
															<input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full rounded-md border border-gray-200 pl-10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Masukan Email" />
														</div>
													</div>

													<div>
														<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Masukan Kata Sandi</label>
														<div className="relative">
															<span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
																<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
																	<path d="M12 17c1.657 0 3-1.567 3-3.5V10a3 3 0 10-6 0v3.5C9 15.433 10.343 17 12 17z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
																	<path d="M5 20h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
																</svg>
															</span>
															<input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full rounded-md border border-gray-200 pl-10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="Masukan Kata Sandi" />
															</div>
														</div>

													{error && <div className="text-sm text-red-600">{error}</div>}

													<div>
														<Button type="submit" variant="primary" className="w-full py-3 rounded-lg">Login</Button>
													</div>
												</form>
									</div>
								</div>
							</div>
						</main>
				</div>
		);
	}

