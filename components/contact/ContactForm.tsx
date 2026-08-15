'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';

interface ContactFormData {
  name: string; email: string; subject?: string; message: string;
}

export function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to send');
      toast({ title: 'Message sent!', description: "I'll get back to you as soon as possible." });
      reset();
    } catch {
      toast({ title: 'Error', description: 'Failed to send message. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="John Doe" {...register('name', { required: true })} />
          {errors.name && <p className="text-xs text-destructive">Name is required</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="john@example.com" {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
          {errors.email && <p className="text-xs text-destructive">Valid email is required</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Project Inquiry..." {...register('subject')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" placeholder="Tell me about your project or idea..." rows={6} {...register('message', { required: true, minLength: 10 })} />
        {errors.message && <p className="text-xs text-destructive">Message is required (min 10 chars)</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-all disabled:opacity-60 shadow-lg shadow-primary/25"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
