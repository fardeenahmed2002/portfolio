'use client';

import { motion } from 'framer-motion';
import type { ISkill } from '@/types';

interface SkillCardProps { skill: ISkill; index: number }

function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-sm">{skill.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{skill.category}</p>
        </div>
        {skill.yearsExperience && (
          <span className="text-xs text-muted-foreground">{skill.yearsExperience}yr{skill.yearsExperience > 1 ? 's' : ''}</span>
        )}
      </div>
      {skill.level !== undefined && skill.level > 0 && (
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Proficiency</span>
            <span>{skill.level}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
              className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface SkillsSectionProps { skills: ISkill[] }

const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'AI & Automation', 'Other'];

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (!skills.length) return null;

  const grouped = categories.reduce((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length) acc[cat] = catSkills;
    return acc;
  }, {} as Record<string, ISkill[]>);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Skills</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Tech Stack</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Technologies I work with daily to build fast, scalable web applications.
        </p>
      </motion.div>

      <div className="space-y-10">
        {Object.entries(grouped).map(([category, catSkills]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-3">
              <span className="flex-1 h-px bg-border" />
              {category}
              <span className="flex-1 h-px bg-border" />
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {catSkills.map((skill, i) => (
                <SkillCard key={skill._id} skill={skill} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
