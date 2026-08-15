import { auth } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

// Admin pages are authenticated and DB-backed; never prerender them at build.
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // When not signed in, hide the CMS sidebar/nav entirely — the visitor only
  // sees the page itself (e.g. the login screen), not the admin tabs.
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
