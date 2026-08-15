import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { getSocials } from '@/lib/data';

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
