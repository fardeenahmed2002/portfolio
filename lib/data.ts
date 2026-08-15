import dbConnect from '@/lib/db';
import ProfileModel from '@/models/Profile';
import SkillModel from '@/models/Skill';
import ProjectModel from '@/models/Project';
import ExperienceModel from '@/models/Experience';
import EducationModel from '@/models/Education';
import ServiceModel from '@/models/Service';
import AchievementModel from '@/models/Achievement';
import SocialModel from '@/models/Social';
import type {
  IProfile, ISkill, IProject, IExperience,
  IEducation, IService, IAchievement, ISocial
} from '@/types';

function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

export async function getProfile(): Promise<IProfile | null> {
  await dbConnect();
  const profile = await ProfileModel.findOne().lean();
  return profile ? serialize<IProfile>(profile) : null;
}

export async function getSkills(onlyPublished = true): Promise<ISkill[]> {
  await dbConnect();
  const filter = onlyPublished ? { status: 'published' } : {};
  const skills = await SkillModel.find(filter).sort({ order: 1, createdAt: 1 }).lean();
  return serialize<ISkill[]>(skills);
}

export async function getProjects(options?: {
  onlyPublished?: boolean;
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<IProject[]> {
  await dbConnect();
  const filter: Record<string, unknown> = {};
  if (options?.onlyPublished !== false) filter.status = 'published';
  if (options?.category && options.category !== 'All') filter.category = options.category;
  if (options?.featured) filter.featured = true;

  const query = ProjectModel.find(filter).sort({ order: 1, createdAt: -1 });
  if (options?.limit) query.limit(options.limit);
  const projects = await query.lean();
  return serialize<IProject[]>(projects);
}

export async function getProjectBySlug(slug: string): Promise<IProject | null> {
  await dbConnect();
  const project = await ProjectModel.findOne({ slug, status: 'published' }).lean();
  return project ? serialize<IProject>(project) : null;
}

export async function getExperiences(onlyPublished = true): Promise<IExperience[]> {
  await dbConnect();
  const filter = onlyPublished ? { status: 'published' } : {};
  const exp = await ExperienceModel.find(filter).sort({ order: 1, startDate: -1 }).lean();
  return serialize<IExperience[]>(exp);
}

export async function getEducation(onlyPublished = true): Promise<IEducation[]> {
  await dbConnect();
  const filter = onlyPublished ? { status: 'published' } : {};
  const edu = await EducationModel.find(filter).sort({ order: 1, startDate: -1 }).lean();
  return serialize<IEducation[]>(edu);
}

export async function getServices(onlyPublished = true): Promise<IService[]> {
  await dbConnect();
  const filter = onlyPublished ? { status: 'published' } : {};
  const services = await ServiceModel.find(filter).sort({ order: 1 }).lean();
  return serialize<IService[]>(services);
}

export async function getAchievements(onlyPublished = true): Promise<IAchievement[]> {
  await dbConnect();
  const filter = onlyPublished ? { status: 'published' } : {};
  const achievements = await AchievementModel.find(filter).sort({ order: 1 }).lean();
  return serialize<IAchievement[]>(achievements);
}

export async function getSocials(onlyVisible = true): Promise<ISocial[]> {
  await dbConnect();
  const filter = onlyVisible ? { visible: true } : {};
  const socials = await SocialModel.find(filter).sort({ order: 1 }).lean();
  return serialize<ISocial[]>(socials);
}
