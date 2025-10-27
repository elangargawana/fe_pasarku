import "../globals.css";
import AdminShell from "../../components/layouts/AdminShell";

export const metadata = {
	title: "Admin - Pasarku",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return <AdminShell>{children}</AdminShell>;
}
