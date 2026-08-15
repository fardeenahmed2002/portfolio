'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import {
  LayoutDashboard, User, FolderOpen, Wrench, Briefcase, GraduationCap,
  Star, MessageSquare, Settings, LogOut, Code2, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/skills', label: 'Skills', icon: Code2 },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/achievements', label: 'Achievements', icon: Star },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">Portfolio CMS</span>
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
              <Icon className="w-4 h-4 flex-shrink-0" />{item.label}
            </Link>
          );
        })}
      </nav>
      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shadow-lg">
        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="md:hidden fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
