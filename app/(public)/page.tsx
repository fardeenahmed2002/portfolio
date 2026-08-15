import { Hero } from '@/components/home/Hero';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import {
  getProfile, getProjects, getExperiences, getServices, getSocials
} from '@/lib/data';

export default async function HomePage() {
  const [profile, projects, experiences, services, socials] = await Promise.all([
    getProfile(),
    getProjects({ onlyPublished: true, limit: 6 }),
    getExperiences(),
    getServices(),
    getSocials(),
  ]);

  return (
    <>
      <Hero profile={profile} socials={socials} />
      <FeaturedProjects projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ServicesSection services={services} />

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto glass rounded-3xl p-12 border border-primary/20 glow">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/25"
          >
            Get In Touch →
          </a>
        </div>
      </section>
    </>
  );
}
