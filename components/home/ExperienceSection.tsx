'use client';

import { motion } from 'framer-motion';
import type { IExperience } from '@/types';
import { formatDateRange } from '@/lib/utils';
import { Briefcase, MapPin } from 'lucide-react';

interface ExperienceSectionProps { experiences: IExperience[] }

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences.length) return null;
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Career</p>
        <h2 className="text-4xl sm:text-5xl font-bold">Experience</h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent hidden sm:block" />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative sm:pl-16"
            >
              {/* Dot */}
              <div className="absolute left-3.5 top-5 w-5 h-5 rounded-full border-2 border-primary bg-background hidden sm:flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <div className="glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="text-primary font-medium flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.company}
                    </p>
                    {exp.location && (
                      <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3" />{exp.location}
                      </p>
                    )}
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium whitespace-nowrap">
                    {formatDateRange(exp.startDate as string, exp.endDate as string, exp.current)}
                  </span>
                </div>
                {exp.description && <p className="text-muted-foreground text-sm leading-relaxed mb-3">{exp.description}</p>}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-primary mt-1 flex-shrink-0">▸</span>{r}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
