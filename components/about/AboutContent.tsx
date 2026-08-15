'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { IProfile, ISkill, IExperience, IEducation } from '@/types';
import { formatDateRange } from '@/lib/utils';
import { GraduationCap, Briefcase, Code2 } from 'lucide-react';

interface AboutContentProps {
  profile: IProfile | null; skills: ISkill[];
  experiences: IExperience[]; education: IEducation[];
}

const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'AI & Automation'];

export function AboutContent({ profile, skills, experiences, education }: AboutContentProps) {
  const name = profile?.name ?? 'Fardeen Ahmed';
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">About</p>
        <h1 className="text-5xl font-bold mb-4">Who I Am</h1>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          {profile?.avatar ? (
            <div className="relative w-full aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border-2 border-primary/30 glow">
              <Image src={profile.avatar} alt={name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-full aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center border border-primary/20">
              <span className="text-9xl font-bold text-primary/30">{name[0]}</span>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{name}</h2>
          <p className="text-primary font-medium mb-6">{profile?.title ?? 'Frontend Developer'}</p>
          <p className="text-muted-foreground leading-relaxed mb-6">{profile?.bio ?? ''}</p>
          {profile?.philosophy && (
            <blockquote className="border-l-2 border-primary pl-4 text-muted-foreground italic mb-6">{profile.philosophy}</blockquote>
          )}
          <div className="grid grid-cols-3 gap-4">
            {[{ label: 'Years Exp', value: `${profile?.yearsExperience ?? 0}+` },
              { label: 'Projects', value: `${profile?.projectsCount ?? 0}+` },
              { label: 'Technologies', value: `${profile?.technologiesCount ?? 0}+` }].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl bg-muted/50 border border-border">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {skills.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Code2 className="text-primary" /> Skills</h2>
          <div className="space-y-6">
            {categories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              if (!catSkills.length) return null;
              return (
                <div key={cat}>
                  <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((s) => (
                      <span key={s._id} className="px-3 py-1.5 text-sm rounded-lg border border-primary/30 bg-primary/10 text-primary font-medium">{s.name}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
      {experiences.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><Briefcase className="text-primary" /> Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={String(exp._id)} className="glass rounded-xl p-5 border border-border">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div><h3 className="font-bold">{exp.position}</h3><p className="text-primary text-sm">{exp.company}</p></div>
                  <span className="text-xs text-muted-foreground">{formatDateRange(exp.startDate as string, exp.endDate as string, exp.current)}</span>
                </div>
                {exp.description && <p className="text-muted-foreground text-sm mt-2">{exp.description}</p>}
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {education.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><GraduationCap className="text-primary" /> Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={String(edu._id)} className="glass rounded-xl p-5 border border-border">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div><h3 className="font-bold">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3><p className="text-primary text-sm">{edu.institution}</p></div>
                  <span className="text-xs text-muted-foreground">{formatDateRange(edu.startDate as string, edu.endDate as string, edu.current)}</span>
                </div>
                {edu.grade && <p className="text-muted-foreground text-sm mt-1">Grade: {edu.grade}</p>}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
