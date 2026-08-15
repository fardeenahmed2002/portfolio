'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { IService } from '@/types';

interface ServiceForm { title: string; description: string; icon?: string; features?: string; order?: number }

export default function AdminServicesPage() {
  const [items, setItems] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<ServiceForm>();

  const load = async () => {
    const r = await fetch('/api/admin/services');
    setItems(await r.json()); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const onSubmit = async (data: ServiceForm) => {
    const body = {
      ...data,
      features: data.features ? data.features.split('\n').filter(Boolean) : [],
    };
    const r = await fetch(editing ? `/api/admin/services/${editing}` : '/api/admin/services', {
      method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    if (r.ok) { toast({ title: editing ? 'Updated' : 'Added' }); reset(); setShowForm(false); setEditing(null); load(); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete?')) return;
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    toast({ title: 'Deleted' }); load();
  };

  const edit = (s: IService) => {
    setEditing(s._id!); setShowForm(true);
    reset({ title: s.title, description: s.description, icon: s.icon, features: s.features ? s.features.join('\n') : '', order: s.order });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Services</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); reset(); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 border border-border space-y-4 mb-8 max-w-2xl">
          <div className="flex justify-between items-center"><h2 className="font-bold">{editing ? 'Edit Service' : 'Add Service'}</h2><button onClick={() => setShowForm(false)} type="button"><X className="w-4 h-4" /></button></div>
          <div className="space-y-2"><Label>Title *</Label><Input {...register('title', { required: true })} /></div>
          <div className="space-y-2"><Label>Description *</Label><Textarea {...register('description', { required: true })} rows={3} /></div>
          <div className="space-y-2"><Label>Icon (Lucide name: Code, Layout, Cpu...)</Label><Input {...register('icon')} /></div>
          <div className="space-y-2"><Label>Features (one per line)</Label><Textarea {...register('features')} rows={3} /></div>
          <button type="submit" className="px-6 py-2 rounded-xl bg-primary text-white font-semibold flex items-center gap-2"><Check className="w-4 h-4" /> {editing ? 'Update' : 'Save'}</button>
        </form>
      )}

      {loading ? <div className="flex justify-center h-40"><Loader2 className="w-8 h-8 animate-spin text-primary mt-10" /></div> : (
        <div className="grid sm:grid-cols-2 gap-4">
          {!items.length && <p className="text-muted-foreground text-center py-8 col-span-2">No services added.</p>}
          {items.map((s) => (
            <div key={s._id} className="glass rounded-xl p-5 border border-border flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(s)} className="p-2 rounded-lg border border-border hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={() => del(s._id!)} className="p-2 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
