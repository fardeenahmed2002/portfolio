'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { ISkill } from '@/types';

const CATS = ['Frontend', 'Backend', 'Database', 'Tools', 'AI & Automation', 'Other'];
interface SF { name: string; category: string; level?: number; yearsExperience?: number; status: string }

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<SF>({ defaultValues: { status: 'published' } });

  const load = async () => {
    const r = await fetch('/api/admin/skills');
    setSkills(await r.json()); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const onSubmit = async (data: SF) => {
    const r = await fetch(editing ? `/api/admin/skills/${editing}` : '/api/admin/skills', {
      method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    if (r.ok) { toast({ title: editing ? 'Updated' : 'Added' }); reset({ status: 'published' }); setShowForm(false); setEditing(null); load(); }
    else toast({ title: 'Error', variant: 'destructive' });
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
    toast({ title: 'Deleted' }); load();
  };

  const edit = (s: ISkill) => {
    setEditing(s._id!); setShowForm(true);
    reset({ name: s.name, category: s.category, level: s.level, yearsExperience: s.yearsExperience, status: s.status ?? 'published' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Skills</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); reset({ status: 'published' }); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>
      {showForm && (
        <div className="glass rounded-2xl p-6 border border-border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{editing ? 'Edit Skill' : 'Add Skill'}</h2>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Name *</Label><Input {...register('name', { required: true })} placeholder="React" /></div>
            <div className="space-y-2"><Label>Category *</Label>
              <select {...register('category', { required: true })} className="flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm">
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2"><Label>Level (0-100)</Label><Input type="number" min={0} max={100} {...register('level', { valueAsNumber: true })} /></div>
            <div className="space-y-2"><Label>Years Experience</Label><Input type="number" {...register('yearsExperience', { valueAsNumber: true })} /></div>
            <div className="space-y-2"><Label>Status</Label>
              <select {...register('status')} className="flex h-10 w-full rounded-lg border border-input bg-input/30 px-3 py-2 text-sm">
                <option value="published">Published</option><option value="draft">Draft</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full h-10 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />{editing ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="flex justify-center h-40"><Loader2 className="w-8 h-8 animate-spin text-primary mt-10" /></div> : (
        <div className="space-y-2">
          {!skills.length && <p className="text-muted-foreground text-center py-10">No skills yet.</p>}
          {skills.map((s) => (
            <div key={s._id} className="glass rounded-xl p-4 border border-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div><p className="font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.category} · {s.level != null ? `${s.level}%` : 'No level'}</p></div>
                {s.status === 'draft' && <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Draft</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(s)} className="w-8 h-8 rounded-lg border border-border hover:bg-muted flex items-center justify-center"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => del(s._id!)} className="w-8 h-8 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive flex items-center justify-center"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
