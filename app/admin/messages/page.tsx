'use client';

import { useState, useEffect } from 'react';
import { Loader2, Trash2, Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { IMessage } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadMessages = async () => {
    const r = await fetch('/api/admin/messages');
    setMessages(await r.json());
    setLoading(false);
  };

  useEffect(() => { loadMessages(); }, []);

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read }),
    });
    loadMessages();
  };

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete message?')) return;
    await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
    toast({ title: 'Message deleted' });
    loadMessages();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Messages</h1>
      <p className="text-muted-foreground mb-8">Inquiries submitted from your contact form</p>

      {loading ? (
        <div className="flex justify-center h-40"><Loader2 className="w-8 h-8 animate-spin text-primary mt-10" /></div>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 && <p className="text-muted-foreground text-center py-12">No messages received yet.</p>}
          {messages.map((m) => (
            <div key={m._id} className={`glass rounded-2xl p-6 border transition-all ${m.read ? 'border-border opacity-80' : 'border-primary/50 shadow-md shadow-primary/5'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{m.name}</h3>
                    {!m.read && <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-white font-medium">New</span>}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-sm text-primary flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />{m.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{m.createdAt ? formatDate(m.createdAt as Date) : ''}</span>
                  <button onClick={() => markRead(m._id!, !m.read)} className="p-1.5 rounded-lg border border-border hover:bg-muted" title={m.read ? 'Mark unread' : 'Mark read'}>
                    <CheckCircle2 className={`w-4 h-4 ${m.read ? 'text-green-500' : 'text-muted-foreground'}`} />
                  </button>
                  <button onClick={() => deleteMsg(m._id!)} className="p-1.5 rounded-lg border border-destructive/30 hover:bg-destructive/10 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {m.subject && <p className="font-medium text-sm mb-2">Subject: {m.subject}</p>}
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
