import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Profile from '@/models/Profile';
import Skill from '@/models/Skill';
import Experience from '@/models/Experience';
import Service from '@/models/Service';
import Social from '@/models/Social';

// One-time seed endpoint — disable in production!
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Disabled in production' }, { status: 403 });
  }

  await dbConnect();

  // Create admin user if not exists
  const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL ?? 'admin@fardeenportfolio.com' });
  if (!existingUser) {
    await User.create({
      email: process.env.ADMIN_EMAIL ?? 'admin@fardeenportfolio.com',
      password: process.env.ADMIN_PASSWORD ?? 'Admin@123456',
      name: 'Fardeen Ahmed',
      role: 'admin',
    });
  }

  // Create profile if not exists
  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create({
      name: 'Fardeen Ahmed',
      title: 'Frontend Developer',
      subtitle: 'Building the web, one component at a time',
      bio: 'A detail-oriented and self-driven Frontend Developer who builds responsive, user-friendly, and interactive web interfaces with React, Next.js, and modern UI workflows.',
      philosophy: 'I believe great software is built at the intersection of clean code, thoughtful design, and user empathy.',
      email: 'fardeen@example.com',
      location: 'Bangladesh',
      availability: true,
      yearsExperience: 3,
      projectsCount: 10,
      technologiesCount: 8,
    });
  }

  // Seed skills
  const skillCount = await Skill.countDocuments();
  if (!skillCount) {
    await Skill.insertMany([
      { name: 'HTML5', category: 'Frontend', level: 95, yearsExperience: 4, order: 1 },
      { name: 'CSS3', category: 'Frontend', level: 90, yearsExperience: 4, order: 2 },
      { name: 'JavaScript', category: 'Frontend', level: 88, yearsExperience: 3, order: 3 },
      { name: 'TypeScript', category: 'Frontend', level: 82, yearsExperience: 2, order: 4 },
      { name: 'React', category: 'Frontend', level: 88, yearsExperience: 3, order: 5 },
      { name: 'Next.js', category: 'Frontend', level: 85, yearsExperience: 2, order: 6 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 90, yearsExperience: 2, order: 7 },
      { name: 'Node.js', category: 'Backend', level: 80, yearsExperience: 2, order: 8 },
      { name: 'Express.js', category: 'Backend', level: 78, yearsExperience: 2, order: 9 },
      { name: 'MongoDB', category: 'Database', level: 80, yearsExperience: 2, order: 10 },
      { name: 'Git', category: 'Tools', level: 85, yearsExperience: 3, order: 11 },
      { name: 'GitHub', category: 'Tools', level: 85, yearsExperience: 3, order: 12 },
      { name: 'Vercel', category: 'Tools', level: 80, yearsExperience: 2, order: 13 },
      { name: 'n8n', category: 'AI & Automation', level: 70, yearsExperience: 1, order: 14 },
      { name: 'Gemini API', category: 'AI & Automation', level: 72, yearsExperience: 1, order: 15 },
    ]);
  }

  // Seed experience
  const expCount = await Experience.countDocuments();
  if (!expCount) {
    await Experience.create({
      company: 'BRIMSEL AI',
      position: 'Frontend Developer & Digital Content Executive',
      location: 'Remote',
      startDate: new Date('2025-01-01'),
      current: true,
      description: 'Building responsive EdTech Progressive Web Applications and managing digital content production.',
      responsibilities: [
        'Building responsive EdTech PWAs using React.js and Vite',
        'Developing sales monitoring dashboards and interactive web applications',
        'Managing digital content and video asset optimization',
        'AI-generated visual content and workflow automation with n8n',
      ],
      technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'n8n', 'AI Tools'],
      order: 1,
    });
  }

  // Seed services
  const serviceCount = await Service.countDocuments();
  if (!serviceCount) {
    await Service.insertMany([
      { title: 'Frontend Development', description: 'Pixel-perfect, responsive UIs with React and Next.js', icon: 'globe', features: ['React / Next.js', 'Tailwind CSS', 'Animations & Interactions', 'SEO Optimization'], order: 1 },
      { title: 'Backend Development', description: 'Scalable APIs and server-side logic with Node.js', icon: 'server', features: ['REST APIs', 'Authentication', 'Database Design', 'Performance'], order: 2 },
      { title: 'Web App Development', description: 'End-to-end web application development', icon: 'zap', features: ['Modern Frontend Architecture', 'Database Integration', 'Deployment', 'Maintenance'], order: 3 },
      { title: 'AI & Automation', description: 'Workflow automation and AI-powered features', icon: 'bot', features: ['n8n Workflows', 'AI API Integration', 'Process Automation', 'Content Generation'], order: 4 },
    ]);
  }

  // Seed socials
  const socialCount = await Social.countDocuments();
  if (!socialCount) {
    await Social.insertMany([
      { platform: 'GitHub', url: 'https://github.com/fardeen', icon: 'github', order: 1 },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/fardeen', icon: 'linkedin', order: 2 },
    ]);
  }

  return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
}
