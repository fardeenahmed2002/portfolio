'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import type { IProfile } from '@/types';
import { ImageUpload } from "@/components/shared/ImageUpload";

interface ProfileFormData {
  name: string; title: string; subtitle?: string; bio: string; philosophy?: string;
  email: string; phone?: string; location?: string; availability?: boolean;
  yearsExperience?: number; projectsCount?: number; technologiesCount?: number;
  seoTitle?: string; seoDescription?: string; avatar?: string;
}

export default function AdminProfilePage() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ProfileFormData>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/profile').then(r => r.json()).then((data: IProfile) => {
      if (data) reset(data);
    }).finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Profile saved!' });
    } catch {
      toast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="glass rounded-2xl p-6 border border-border space-y-4">
          <h2 className="font-semibold text-lg">Basic Info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Name *</Label><Input {...register('name', { required: true })} />{errors.name && <p className="text-xs text-destructive">Required</p>}</div>
            <div className="space-y-2"><Label>Title *</Label><Input {...register('title', { required: true })} />{errors.title && <p className="text-xs text-destructive">Required</p>}</div>
          </div>
          <div className="space-y-2"><Label>Subtitle</Label><Input {...register('subtitle')} /></div>
          <div className="space-y-2"><Label>Bio *</Label><Textarea {...register('bio', { required: true })} rows={4} /></div>
          <div className="space-y-2"><Label>Philosophy</Label><Textarea {...register('philosophy')} rows={2} /></div>
          <ImageUpload
            label="Profile Photo"
            value={watch('avatar')}
            onChange={(url) => setValue('avatar', url)}
          />
        </div>
        <div className="glass rounded-2xl p-6 border border-border space-y-4">
          <h2 className="font-semibold text-lg">Contact</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Email *</Label><Input type="email" {...register('email', { required: true })} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input {...register('phone')} /></div>
          </div>
          <div className="space-y-2"><Label>Location</Label><Input {...register('location')} /></div>
        </div>
        <div className="glass rounded-2xl p-6 border border-border space-y-4">
          <h2 className="font-semibold text-lg">Stats & Availability</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Years Exp</Label><Input type="number" {...register('yearsExperience', { valueAsNumber: true })} /></div>
            <div className="space-y-2"><Label>Projects</Label><Input type="number" {...register('projectsCount', { valueAsNumber: true })} /></div>
            <div className="space-y-2"><Label>Technologies</Label><Input type="number" {...register('technologiesCount', { valueAsNumber: true })} /></div>
          </div>
          <div className="flex items-center gap-3"><input type="checkbox" id="av" {...register('availability')} className="w-4 h-4 accent-primary" /><Label htmlFor="av">Available for opportunities</Label></div>
        </div>
        <div className="glass rounded-2xl p-6 border border-border space-y-4">
          <h2 className="font-semibold text-lg">SEO</h2>
          <div className="space-y-2"><Label>SEO Title</Label><Input {...register('seoTitle')} /></div>
          <div className="space-y-2"><Label>SEO Description</Label><Textarea {...register('seoDescription')} rows={2} /></div>
        </div>
        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-60 transition-all">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
