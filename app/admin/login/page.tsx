'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, Mail, Code2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn('credentials', {
      email, password, redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      toast({ title: 'Login failed', description: 'Invalid email or password.', variant: 'destructive' });
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background animated-bg px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-border space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="admin@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full h-12 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-60 shadow-lg shadow-primary/25">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
