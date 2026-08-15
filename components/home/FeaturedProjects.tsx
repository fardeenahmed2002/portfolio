'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from '@/components/shared/SocialIcons';
import type { IProject } from '@/types';
import { Badge } from '@/components/ui/badge';
import { truncate } from '@/lib/utils';

interface ProjectCardProps { project: IProject; featured?: boolean; index: number }

export function ProjectCard({ project, featured, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 ${featured ? 'lg:col-span-2' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-72' : 'h-48'} bg-muted`}>
        {project.thumbnail || (project.images && project.images[0]) ? (
          <Image
            src={project.thumbnail || project.images[0]}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/30">{project.title[0]}</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium backdrop-blur-sm">
            <Star className="w-3 h-3 fill-current" /> Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4 gap-2">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <GithubIcon className="w-4 h-4" />
            </Link>
          )}
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="default">{project.category}</Badge>
          <Link href={`/projects/${project.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <Link href={`/projects/${project.slug}`}>
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {truncate(project.description, 120)}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground font-medium">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground font-medium">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

interface FeaturedProjectsProps { projects: IProject[] }

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects.length) return null;
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-14"
      >
        <div>
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold">Featured Projects</h2>
        </div>
        <Link href="/projects" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          All projects <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project._id} project={project} featured={project.featured && i === 0} index={i} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          View all projects <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
