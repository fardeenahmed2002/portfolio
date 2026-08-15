import type { Metadata } from 'next';
import { getProfile, getSkills, getExperiences, getEducation } from '@/lib/data';
import { AboutContent } from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Fardeen Ahmed — Frontend Developer',
};

export default async function AboutPage() {
  const [profile, skills, experiences, education] = await Promise.all([
    getProfile(), getSkills(), getExperiences(), getEducation(),
  ]);

  return <AboutContent profile={profile} skills={skills} experiences={experiences} education={education} />;
}
