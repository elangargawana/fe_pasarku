"use client";

import { useState } from "react";
import Headbar from "../../../components/Headbar";
import Button from "../../../components/ui/button/Button";

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState<string | null>(null);

	function validateEmail(e: string) {
		return /\S+@\S+\.\S+/.test(e);
	}

	function onSubmit(ev: React.FormEvent) {
		ev.preventDefault();
		setMessage(null);

		if (!name.trim() || !validateEmail(email) || password.length < 6) {
			setMessage("Periksa kembali data input (nama, email, password >= 6).");
			return;
		}

		setTimeout(() => {
			setMessage("Registrasi berhasil (simulasi). Silakan login.");
			setName("");
			setEmail("");
			setPassword("");
		}, 600);
	}

	return (
		<div className="min-h-screen bg-green-50">
			<Headbar />

			<main className="max-w-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
				<div className="bg-white rounded-xl p-6 sm:p-8 shadow-soft shadow-xl">
					<h2 className="text-2xl font-bold mb-2">Register</h2>
					<p className="text-sm text-gray-600 mb-6">Sudah punya akun? <a href="/auth/login" className="text-green-600 font-medium">Login</a></p>

					{message && <div className="mb-4 text-sm text-green-700">{message}</div>}

					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
										<path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</span>
								<input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" className="block w-full rounded-md border border-gray-200 pl-10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200" />
							</div>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
										<path d="M3 8.5l9 6 9-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
										<rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
									</svg>
								</span>
								<input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@contoh.com" className="block w-full rounded-md border border-gray-200 pl-10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200" />
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
										<path d="M12 17c1.657 0 3-1.567 3-3.5V10a3 3 0 10-6 0v3.5C9 15.433 10.343 17 12 17z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M5 20h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</span>
								<input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimal 6 karakter" className="block w-full rounded-md border border-gray-200 pl-10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200" />
							</div>
						</div>

						<div>
							<Button type="submit" variant="primary" className="w-full py-3 rounded-lg">Register</Button>
						</div>
					</form>
				</div>
			</main>
		</div>
	)
}
