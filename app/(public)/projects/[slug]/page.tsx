import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, Calendar } from 'lucide-react';
import { GithubIcon } from '@/components/shared/SocialIcons';
import { getProjectBySlug } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
      </Link>

      {/* Hero image */}
      {(project.thumbnail || (project.images && project.images[0])) && (
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-10 border border-border">
          <Image src={project.thumbnail || project.images[0]} alt={project.title} fill className="object-cover" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <Badge variant="default" className="mb-3">{project.category}</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold">{project.title}</h1>
        </div>
        <div className="flex gap-3">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm">
              <GithubIcon className="w-4 h-4" /> Code
            </Link>
          )}
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm hover:opacity-90 transition-opacity">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </Link>
          )}
        </div>
      </div>

      {project.startDate && (
        <p className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
          <Calendar className="w-4 h-4" />
          {formatDate(project.startDate as Date)}
          {project.endDate ? ` – ${formatDate(project.endDate as Date)}` : ' – Present'}
        </p>
      )}

      <p className="text-lg text-muted-foreground leading-relaxed mb-8">{project.description}</p>

      {project.longDescription && (
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
        </div>
      )}

      {/* Technologies */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1.5 text-sm rounded-lg bg-muted text-muted-foreground font-medium">{tech}</span>
          ))}
        </div>
      </div>

      {/* Extra images */}
      {project.images && project.images.length > 1 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {project.images.slice(1).map((img, i) => (
            <div key={i} className="relative h-48 rounded-xl overflow-hidden border border-border">
              <Image src={img} alt={`${project.title} screenshot ${i + 2}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
