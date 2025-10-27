import StatCard from '../../../components/ui/StatCard';
import ActionCard from '../../../components/ui/ActionCard';
import ApprovalCardDashboard from '../../../components/admin/approvalsdashboard/ApprovalCardDashboard';
import LowStockCard from '../../../components/admin/stock/LowStockCard';
import TransactionsChart from '../../../components/admin/charts/TransactionsChart';
import ActivitiesCard from '../../../components/admin/activities/ActivitiesCard';

export default function DashboardPage() {
	return (
		<div className="p-8 pb-0 pl-0 pr-0">
			<div className="max-w-8xl mx-auto">
				{/* Aktivitas Hari Ini */}
				<h1 className="text-2xl font-semibold mb-6">Aktivitas Hari Ini</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<StatCard
						title="Total Pedagang"
						value={85}
						delta="+3 Bulan ini"
						pills={[
							{ label: '80 Aktif' },
							{ label: '5 Pending', tone: 'muted' },
						]}
						ctaHref="/admin/pedagang"
						iconName="users"
					/>

					<StatCard
						title="Total Produk"
						value={450}
						delta="+12 Minggu ini"
						pills={[
							{ label: '425 Aktif' },
							{ label: '25 Stok Habis' },
						]}
						ctaHref="/admin/produk"
						iconName="products"
					/>

					<StatCard
						title="Transaksi Hari Ini"
						value={142}
						delta="+15% dari kemarin"
						smallLabel="Value:"
						smallValue="Rp. 3.500.000"
						ctaHref="/admin/transaksi"
						iconName="transactions"
					/>

					<StatCard
						title="Supply Hari Ini"
						value={28}
						delta="2 Jam yang lalu"
						smallLabel="Total Weight:"
						smallValue="450 Kg"
						ctaHref="/admin/supply"
						iconName="supply"
					/>
				</div>

				<div className="my-8">
					<hr className="border-t-2 border-green-100" />
				</div>

				{/* Akses Cepat */}
				<h1 className="text-2xl font-semibold mb-6">Akses Cepat</h1>

				<div className="mt-6 max-w-8xl mx-auto">
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
						<ActionCard title="Verifikasi Pedagang" icon="/next.svg" badge={20} />
						<ActionCard title="Log Supply Harian" icon="/next.svg" />
						<ActionCard title="Lihat Inventory" icon="/next.svg" />
						<ActionCard title="Buat Pengumuman" icon="/next.svg" />
						<ActionCard title="Download Laporan" icon="/next.svg" />
						<ActionCard title="Tambah Admin" icon="/next.svg" />
					</div>
				</div>

				<div className="my-8">
					<hr className="border-t-2 border-green-100" />
				</div>

				{/* Memerlukan Persetujuan */}
				<h1 className="text-2xl font-semibold mb-6">Memerlukan Persetujuan</h1>
				<div className="max-w-8xl mx-auto mb-6">
					<ApprovalCardDashboard />
				</div>

				<div className="my-8">
					<hr className="border-t-2 border-green-100" />
				</div>

				{/* Transaksi 7 Hari Terakhir */}
				<h1 className="text-2xl font-semibold mb-6">Transaksi 7 Hari Terakhir</h1>
				<div className="max-w-8xl mx-auto mb-6">
					<div className="bg-green-50 rounded-lg p-6 shadow-sm">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
							{/* Chart Area */}
							<div className="lg:col-span-2">
								<div className="bg-white h-full rounded-md border border-green-100 p-0 sm:p-4 min-h-[220px] sm:min-h-60 md:min-h-[260px] flex flex-col">
									<div className="flex-1 w-full">
										<TransactionsChart />
									</div>
								</div>
							</div>

							{/* Statistik Kanan */}
							<div className="space-y-4">
								<div className="bg-white rounded-lg p-4 border border-green-100">
									<div className="text-sm text-gray-600">Total Transaksi</div>
									<div className="text-3xl font-bold text-gray-800">85</div>
								</div>

								<div className="bg-white rounded-lg p-4 border border-green-100">
									<div className="text-sm text-gray-600">Total Revenue</div>
									<div className="text-2xl font-extrabold text-gray-800">
										Rp 21.500.000
									</div>
								</div>

								<div className="bg-white rounded-lg p-4 border border-green-100">
									<div className="text-sm text-gray-600 mb-2">AVG Per Day</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between bg-green-50 rounded-full px-3 py-2 border border-green-100">
											<div className="text-sm text-gray-600">Revenue:</div>
											<div className="text-sm font-semibold text-green-700">
												Rp. 3.070.000
											</div>
										</div>
										<div className="flex items-center justify-between bg-green-50 rounded-full px-3 py-2 border border-green-100">
											<div className="text-sm text-gray-600">Transaksi:</div>
											<div className="text-sm font-semibold text-green-700">
												122
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="my-8">
					<hr className="border-t-2 border-green-100" />
				</div>

				{/* Produk Stock Rendah */}
				<h1 className="text-2xl font-semibold mb-6">Produk Stock Rendah</h1>
				<div className="max-w-8xl mx-auto mb-6">
					<LowStockCard />
				</div>

				<div className="my-8">
					<hr className="border-t-2 border-green-100" />
				</div>

				{/* Aktivitas Terbaru */}
				<h1 className="text-2xl font-semibold mb-6">Aktivitas Terbaru</h1>
				<div className="max-w-8xl mx-auto mb-6">
					<ActivitiesCard />
				</div>
			</div>
		</div>
	);
}
