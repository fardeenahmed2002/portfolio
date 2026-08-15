import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
