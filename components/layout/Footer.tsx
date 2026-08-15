import Link from 'next/link';
import { Mail, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/SocialIcons';
import type { ISocial } from '@/types';

interface FooterProps { socials?: ISocial[] }

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon className="w-4 h-4" />,
  linkedin: <LinkedinIcon className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
};

export function Footer({ socials = [] }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="gradient-text">Fardeen Ahmed</span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Frontend Developer · Building the web, one component at a time.
          </p>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <Link
                key={social._id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 text-muted-foreground"
                aria-label={social.platform}
              >
                {iconMap[social.platform.toLowerCase()] ?? <span className="text-xs">{social.platform[0]}</span>}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Fardeen Ahmed. Built with Next.js, Tailwind CSS & ❤️
        </div>
      </div>
    </footer>
  );
}
