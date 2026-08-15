'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { IAchievement } from '@/types';

interface AchForm { title: string; issuer?: string; date?: string; description?: string; link?: string }

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<IAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<AchForm>();

  const load = async () => {
    const r = await fetch('/api/admin/achievements');
    setItems(await r.json()); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const onSubmit = async (data: AchForm) => {
    const r = await fetch(editing ? `/api/admin/achievements/${editing}` : '/api/admin/achievements', {
      method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    if (r.ok) { toast({ title: editing ? 'Updated' : 'Added' }); reset(); setShowForm(false); setEditing(null); load(); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin/achievements/${id}`, { method: 'DELETE' });
    toast({ title: 'Deleted' }); load();
  };

  const edit = (a: IAchievement) => {
    setEditing(a._id!); setShowForm(true);
    reset({
      title: a.title, issuer: a.issuer, description: a.description, link: a.link,
      date: a.date ? new Date(a.date).toISOString().substring(0, 10) : '',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Achievements & Certifications</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); reset(); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 border border-border space-y-4 mb-8 max-w-2xl">
          <div className="flex justify-between items-center"><h2 className="font-bold">{editing ? 'Edit Achievement' : 'Add Achievement'}</h2><button onClick={() => setShowForm(false)} type="button"><X className="w-4 h-4" /></button></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Title *</Label><Input {...register('title', { required: true })} /></div>
            <div className="space-y-2"><Label>Issuer / Organization</Label><Input {...register('issuer')} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Date</Label><Input type="date" {...register('date')} /></div>
            <div className="space-y-2"><Label>Credential Link</Label><Input {...register('link')} /></div>
          </div>
          <div className="space-y-2"><Label>Description</Label><Textarea {...register('description')} rows={2} /></div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-white font-semibold flex items-center gap-2"><Check className="w-4 h-4" /> {editing ? 'Update' : 'Save'}</button>
        </form>
      )}

      {loading ? <div className="flex justify-center h-40"><Loader2 className="w-8 h-8 animate-spin text-primary mt-10" /></div> : (
        <div className="space-y-3">
          {!items.length && <p className="text-muted-foreground text-center py-8">No achievements added.</p>}
          {items.map((a) => (
            <div key={a._id} className="glass rounded-xl p-4 border border-border flex justify-between items-center">
              <div>
                <h3 className="font-bold">{a.title}</h3>
                {a.issuer && <p className="text-sm text-primary">{a.issuer}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(a)} className="p-2 rounded-lg border border-border hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={() => del(a._id!)} className="p-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
