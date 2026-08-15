import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { getSocials } from '@/lib/data';

// These pages are backed by MongoDB, which is only reachable at runtime (not
// during Vercel's build step). Opting out of static prerendering prevents
// `next build` from attempting to query the DB and aborting the deploy.
export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const socials = await getSocials();
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer socials={socials} />
    </>
  );
}
