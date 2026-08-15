'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Sparkles, MapPin, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/SocialIcons';
import type { IProfile, ISocial } from '@/types';

interface HeroProps { profile: IProfile | null; socials: ISocial[] }

const techBadges = ['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind'];
const socialIcons: Record<string, React.ReactNode> = {
  github: <GithubIcon className="w-4 h-4" />,
  linkedin: <LinkedinIcon className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
};
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export function Hero({ profile, socials }: HeroProps) {
  const name = profile?.name ?? 'Fardeen Ahmed';
  const title = profile?.title ?? 'Frontend Developer';
  const bio = profile?.bio ?? 'Building responsive, scalable, and AI-augmented web applications.';
  const available = profile?.availability ?? true;
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      <div className="absolute inset-0 animated-bg pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            {available && (
              <motion.div {...fade(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Available for opportunities
              </motion.div>
            )}
            <motion.h1 {...fade(0.1)} className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 leading-tight">
              Hi, I&apos;m <span className="gradient-text">{name.split(' ')[0]}</span>
              <br /><span className="text-muted-foreground text-4xl">{name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>
            <motion.p {...fade(0.2)} className="text-xl font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />{title}
            </motion.p>
            <motion.p {...fade(0.3)} className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-6">{bio}</motion.p>
            {profile?.location && (
              <motion.p {...fade(0.35)} className="flex items-center gap-1.5 text-muted-foreground text-sm mb-8">
                <MapPin className="w-4 h-4" />{profile.location}
              </motion.p>
            )}
            <motion.div {...fade(0.4)} className="flex flex-wrap gap-4 mb-8">
              <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5">
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
              {profile?.cvUrl && (
                <Link href={profile.cvUrl} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-muted font-semibold transition-all hover:-translate-y-0.5">
                  <Download className="w-4 h-4" /> Download CV
                </Link>
              )}
            </motion.div>
            {socials.length > 0 && (
              <motion.div {...fade(0.5)} className="flex items-center gap-3">
                {socials.map((s) => (
                  <Link key={s._id} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-muted-foreground" aria-label={s.platform}>
                    {socialIcons[s.platform.toLowerCase()] ?? <span className="text-xs">{s.platform[0]}</span>}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-8">
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-primary/30 glow">
                {profile?.avatar ? (
                  <Image src={profile.avatar} alt={name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-cyan-500/20 flex items-center justify-center">
                    <span className="text-8xl font-bold text-primary/50">{name[0]}</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-2 border border-border text-sm font-semibold">💻 Frontend Developer</div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-xs">
              {techBadges.map((tech, i) => (
                <motion.span key={tech} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-primary/30 bg-primary/10 text-primary">{tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

