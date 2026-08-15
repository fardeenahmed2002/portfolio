'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database, RefreshCw } from 'lucide-react';

export default function AdminSettingsPage() {
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    if (!confirm('This will seed initial portfolio data into MongoDB. Proceed?')) return;
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Success!', description: data.message });
      } else {
        toast({ title: 'Seeding failed', description: data.error, variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to trigger seed process', variant: 'destructive' });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">System configurations and database management</p>

      <div className="glass rounded-2xl p-6 border border-border space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Database className="w-5 h-5" />
          <h2 className="font-semibold text-lg text-foreground">Database Seeding</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Populate the database with initial profile, skills, projects, experience, and services sample data.
        </p>
        <Button onClick={handleSeed} disabled={seeding} variant="outline" className="gap-2">
          {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {seeding ? 'Seeding Database...' : 'Seed Initial Data'}
        </Button>
      </div>
    </div>
  );
}
