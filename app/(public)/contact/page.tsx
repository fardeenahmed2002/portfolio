import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { getProfile, getSocials } from '@/lib/data';
import { Mail, MapPin, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/SocialIcons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Fardeen Ahmed',
};

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon className="w-5 h-5" />,
  linkedin: <LinkedinIcon className="w-5 h-5" />,
  email: <Mail className="w-5 h-5" />,
};

export default async function ContactPage() {
  const [profile, socials] = await Promise.all([getProfile(), getSocials()]);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-14">
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Contact</p>
        <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Let&apos;s Talk</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            I&apos;m currently available for freelance work, full-time positions, and interesting collaborations.
          </p>

          <div className="space-y-4 mb-8">
            {profile?.email && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-sm font-medium hover:text-primary transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a href={`tel:${profile.phone}`} className="text-sm font-medium hover:text-primary transition-colors">
                    {profile.phone}
                  </a>
                </div>
              </div>
            )}
            {profile?.location && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{profile.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Socials */}
          {socials.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-3">Find me on</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <Link key={s._id} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-muted-foreground"
                    aria-label={s.platform}>
                    {iconMap[s.platform.toLowerCase()] ?? <span className="text-xs">{s.platform[0]}</span>}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </div>
  );
}
