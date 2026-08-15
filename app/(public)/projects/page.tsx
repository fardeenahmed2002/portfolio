import type { Metadata } from 'next';
import { getProjects } from '@/lib/data';
import { ProjectsClient } from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio projects by Fardeen Ahmed',
};

export default async function ProjectsPage() {
  const projects = await getProjects({ onlyPublished: true });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-14">
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Portfolio</p>
        <h1 className="text-5xl font-bold mb-4">All Projects</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A collection of projects I&apos;ve built ranging from full-stack apps to AI-powered tools.
        </p>
      </div>
      <ProjectsClient projects={projects} />
    </div>
  );
}
