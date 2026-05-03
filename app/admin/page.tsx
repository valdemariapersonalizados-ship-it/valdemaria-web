import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { Header } from "@/components/layout/header";

export default function AdminPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-4 text-3xl font-bold">Panel Admin</h1>
        <AdminDashboard />
      </main>
    </>
  );
}
