'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { ImageUpload } from "@/components/shared/ImageUpload";

interface ProjectForm {
  title: string; slug: string; description: string; longDescription?: string;
  category: string; technologies: string; thumbnail?: string; liveUrl?: string;
  githubUrl?: string; featured?: boolean; status: 'published' | 'draft';
}

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectForm>({
    defaultValues: { status: 'draft', category: 'Development' },
  });

  const onSubmit = async (data: ProjectForm) => {
    setLoading(true);
    const techArray = data.technologies.split(',').map((t) => t.trim()).filter(Boolean);
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, technologies: techArray }),
    });
    setLoading(false);
    if (res.ok) {
      toast({ title: 'Project created!' });
      router.push('/admin/projects');
    } else {
      toast({ title: 'Error creating project', variant: 'destructive' });
    }
  };

  return (
    <div className="max-w-3xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to projects
      </Link>
      <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="glass rounded-2xl p-6 border border-border space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Title *</Label>
              <Input {...register('title', { required: true })} onChange={(e) => setValue('slug', slugify(e.target.value))} placeholder="E.g. AI Portfolio CMS" />
              {errors.title && <p className="text-xs text-destructive">Title required</p>}
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input {...register('slug', { required: true })} placeholder="ai-portfolio-cms" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <select {...register('category')} className="flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm">
                <option value="Development">Development</option>
                <option value="Creative">Creative</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select {...register('status')} className="flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Short Description *</Label>
            <Textarea {...register('description', { required: true })} rows={3} placeholder="Brief summary of project..." />
          </div>

          <div className="space-y-2">
            <Label>Long Description</Label>
            <Textarea {...register('longDescription')} rows={5} placeholder="Detailed explanation, features, architecture..." />
          </div>

          <div className="space-y-2">
            <Label>Technologies (comma separated) *</Label>
            <Input {...register('technologies', { required: true })} placeholder="React, Next.js, Node.js, MongoDB" />
          </div>

          <ImageUpload
            label="Thumbnail Image"
            value={watch('thumbnail')}
            onChange={(url) => setValue('thumbnail', url)}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Live URL</Label>
              <Input {...register('liveUrl')} placeholder="https://myproject.com" />
            </div>
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input {...register('githubUrl')} placeholder="https://github.com/..." />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="featured" {...register('featured')} className="w-4 h-4 accent-primary" />
            <Label htmlFor="featured">Feature this project on homepage</Label>
          </div>
        </div>

        <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-60 transition-all flex items-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
