'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { IExperience } from '@/types';
import { formatDate } from '@/lib/utils';

interface EF { company: string; position: string; location?: string; startDate: string; endDate?: string; current?: boolean; description?: string; responsibilities?: string; technologies?: string; }

export default function AdminExperiencePage() {
  const [items, setItems] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<EF>();

  const load = async () => {
    const r = await fetch('/api/admin/experience');
    setItems(await r.json()); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const onSubmit = async (data: EF) => {
    const payload = {
      ...data,
      responsibilities: (data.responsibilities ?? '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      technologies: (data.technologies ?? '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const r = await fetch(editing ? `/api/admin/experience/${editing}` : '/api/admin/experience', {
      method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    if (r.ok) { toast({ title: editing ? 'Updated' : 'Added' }); reset(); setShowForm(false); setEditing(null); load(); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' });
    toast({ title: 'Deleted' }); load();
  };

  const edit = (exp: IExperience) => {
    setEditing(exp._id!); setShowForm(true);
    reset({
      company: exp.company, position: exp.position, location: exp.location,
      startDate: exp.startDate ? new Date(exp.startDate).toISOString().substring(0, 10) : '',
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().substring(0, 10) : '',
      current: exp.current, description: exp.description,
      responsibilities: (exp.responsibilities ?? []).join('\n'),
      technologies: (exp.technologies ?? []).join('\n'),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Experience</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); reset(); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 border border-border space-y-4 mb-8">
          <div className="flex justify-between items-center"><h2 className="font-bold">{editing ? 'Edit Experience' : 'Add Experience'}</h2><button onClick={() => setShowForm(false)} type="button"><X className="w-4 h-4" /></button></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Company *</Label><Input {...register('company', { required: true })} /></div>
            <div className="space-y-2"><Label>Position *</Label><Input {...register('position', { required: true })} /></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Location</Label><Input {...register('location')} /></div>
            <div className="space-y-2"><Label>Start Date *</Label><Input type="date" {...register('startDate', { required: true })} /></div>
            <div className="space-y-2"><Label>End Date</Label><Input type="date" {...register('endDate')} /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" id="curr" {...register('current')} className="w-4 h-4 accent-primary" /><Label htmlFor="curr">Currently work here</Label></div>
          <div className="space-y-2"><Label>Description</Label><Textarea {...register('description')} rows={2} /></div>
          <div className="space-y-2"><Label>Responsibilities</Label><Textarea {...register('responsibilities')} rows={4} placeholder={'One responsibility per line'} /></div>
          <div className="space-y-2"><Label>Technologies</Label><Textarea {...register('technologies')} rows={2} placeholder={'One technology per line'} /></div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-white font-semibold flex items-center gap-2"><Check className="w-4 h-4" /> {editing ? 'Update' : 'Save'}</button>
        </form>
      )}

      {loading ? <div className="flex justify-center h-40"><Loader2 className="w-8 h-8 animate-spin text-primary mt-10" /></div> : (
        <div className="space-y-3">
          {!items.length && <p className="text-muted-foreground text-center py-8">No experience items added.</p>}
          {items.map((exp) => (
            <div key={exp._id} className="glass rounded-xl p-4 border border-border flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">{exp.position}</h3>
                <p className="text-primary text-sm font-medium">{exp.company}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(exp.startDate as Date)} – {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate as Date) : ''}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(exp)} className="p-2 rounded-lg border border-border hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={() => del(exp._id!)} className="p-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
