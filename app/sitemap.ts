import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects({ onlyPublished: true });
    projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch {
    // Database may be unavailable at build time; skip project routes.
    projectRoutes = [];
  }

  return [...staticRoutes, ...projectRoutes];
}
