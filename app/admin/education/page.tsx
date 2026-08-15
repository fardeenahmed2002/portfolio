'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { IEducation } from '@/types';
import { formatDate } from '@/lib/utils';

interface EduForm { institution: string; degree: string; fieldOfStudy?: string; startDate: string; endDate?: string; current?: boolean; grade?: string; }

export default function AdminEducationPage() {
  const [items, setItems] = useState<IEducation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<EduForm>();

  const load = async () => {
    const r = await fetch('/api/admin/education');
    setItems(await r.json()); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const onSubmit = async (data: EduForm) => {
    const r = await fetch(editing ? `/api/admin/education/${editing}` : '/api/admin/education', {
      method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    if (r.ok) { toast({ title: editing ? 'Updated' : 'Added' }); reset(); setShowForm(false); setEditing(null); load(); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin/education/${id}`, { method: 'DELETE' });
    toast({ title: 'Deleted' }); load();
  };

  const edit = (edu: IEducation) => {
    setEditing(edu._id!); setShowForm(true);
    reset({
      institution: edu.institution, degree: edu.degree, fieldOfStudy: edu.fieldOfStudy, grade: edu.grade,
      startDate: edu.startDate ? new Date(edu.startDate).toISOString().substring(0, 10) : '',
      endDate: edu.endDate ? new Date(edu.endDate).toISOString().substring(0, 10) : '',
      current: edu.current,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Education</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); reset(); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 border border-border space-y-4 mb-8">
          <div className="flex justify-between items-center"><h2 className="font-bold">{editing ? 'Edit Education' : 'Add Education'}</h2><button onClick={() => setShowForm(false)} type="button"><X className="w-4 h-4" /></button></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Institution *</Label><Input {...register('institution', { required: true })} /></div>
            <div className="space-y-2"><Label>Degree *</Label><Input {...register('degree', { required: true })} /></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Field of Study</Label><Input {...register('fieldOfStudy')} /></div>
            <div className="space-y-2"><Label>Start Date *</Label><Input type="date" {...register('startDate', { required: true })} /></div>
            <div className="space-y-2"><Label>End Date</Label><Input type="date" {...register('endDate')} /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" id="curr" {...register('current')} className="w-4 h-4 accent-primary" /><Label htmlFor="curr">Currently studying here</Label></div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-white font-semibold flex items-center gap-2"><Check className="w-4 h-4" /> {editing ? 'Update' : 'Save'}</button>
        </form>
      )}

      {loading ? <div className="flex justify-center h-40"><Loader2 className="w-8 h-8 animate-spin text-primary mt-10" /></div> : (
        <div className="space-y-3">
          {!items.length && <p className="text-muted-foreground text-center py-8">No education items added.</p>}
          {items.map((edu) => (
            <div key={edu._id} className="glass rounded-xl p-4 border border-border flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">{edu.degree}</h3>
                <p className="text-primary text-sm font-medium">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatDate(edu.startDate as Date)} – {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate as Date) : ''}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(edu)} className="p-2 rounded-lg border border-border hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={() => del(edu._id!)} className="p-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
