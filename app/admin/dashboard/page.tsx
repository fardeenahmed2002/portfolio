import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getProfile, getProjects, getSkills, getExperiences } from '@/lib/data';
import dbConnect from '@/lib/db';
import MessageModel from '@/models/Message';
import Link from 'next/link';
import { FolderOpen, Code2, Briefcase, MessageSquare, User, ArrowRight } from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  await dbConnect();
  const [profile, projects, skills, experiences] = await Promise.all([
    getProfile(), getProjects({ onlyPublished: false }), getSkills(false), getExperiences(false),
  ]);
  const messages = await MessageModel.countDocuments();
  const unread = await MessageModel.countDocuments({ read: false });

  const stats = [
    { label: 'Projects', value: projects.length, icon: FolderOpen, href: '/admin/projects', color: 'text-blue-500' },
    { label: 'Skills', value: skills.length, icon: Code2, href: '/admin/skills', color: 'text-purple-500' },
    { label: 'Experience', value: experiences.length, icon: Briefcase, href: '/admin/experience', color: 'text-green-500' },
    { label: 'Messages', value: messages, icon: MessageSquare, href: '/admin/messages', color: 'text-yellow-500', badge: unread },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {session.user?.name ?? 'Admin'}!</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.href} href={stat.href}
              className="glass rounded-2xl p-6 border border-border hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.badge ? (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-destructive text-white font-medium">{stat.badge} new</span>
                ) : null}
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-lg mb-4">Profile Status</h2>
          {profile ? (
            <div className="space-y-2">
              <p className="text-sm"><span className="text-muted-foreground">Name:</span> <span className="font-medium">{profile.name}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Title:</span> <span className="font-medium">{profile.title}</span></p>
              <p className="text-sm"><span className="text-muted-foreground">Status:</span> <span className={`font-medium ${profile.availability ? 'text-green-400' : 'text-red-400'}`}>{profile.availability ? '🟢 Available' : '🔴 Unavailable'}</span></p>
              <Link href="/admin/profile" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-2">Edit Profile <ArrowRight className="w-3 h-3" /></Link>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground text-sm mb-3">No profile created yet.</p>
              <Link href="/admin/profile" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm">
                <User className="w-4 h-4" /> Create Profile
              </Link>
            </div>
          )}
        </div>

        <div className="glass rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: '/admin/projects/new', label: '+ Add New Project' },
              { href: '/admin/skills', label: '+ Add New Skill' },
              { href: '/admin/experience', label: '+ Add Experience' },
              { href: '/admin/messages', label: `📬 View Messages ${unread > 0 ? `(${unread} unread)` : ''}` },
            ].map((action) => (
              <Link key={action.href} href={action.href}
                className="block px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors text-muted-foreground hover:text-foreground">
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
