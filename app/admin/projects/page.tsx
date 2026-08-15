'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { IProject } from '@/types';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadProjects = async () => {
    const r = await fetch('/api/projects');
    setProjects(await r.json());
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const r = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (r.ok) { toast({ title: 'Project deleted' }); loadProjects(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Add Project
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center h-40"><Loader2 className="w-8 h-8 animate-spin text-primary mt-10" /></div>
      ) : (
        <div className="glass rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No projects found.</td></tr>
              )}
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-2">
                      {p.title}
                      {p.featured && <span className="px-2 py-0.5 text-[10px] rounded-full bg-yellow-500/20 text-yellow-400 font-semibold">Featured</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{p.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${p.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/projects/${p.slug}`} target="_blank" className="p-2 rounded-lg border border-border hover:bg-muted"><ExternalLink className="w-4 h-4 text-muted-foreground" /></Link>
                      <Link href={`/admin/projects/${p._id}`} className="p-2 rounded-lg border border-border hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></Link>
                      <button onClick={() => deleteProject(p._id!)} className="p-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
