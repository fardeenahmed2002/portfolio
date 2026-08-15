'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IProject } from '@/types';
import { ProjectCard } from '@/components/home/FeaturedProjects';

const categories = ['Development', 'Creative'];

export function ProjectsClient({ projects }: { projects: IProject[] }) {
  const [active, setActive] = useState('Development');
  const filtered = projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === cat
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'border border-border hover:border-primary/50 hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((project, i) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No projects in this category yet.
        </div>
      )}
    </>
  );
}
