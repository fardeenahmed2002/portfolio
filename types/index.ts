export interface IProfile {
  _id?: string;
  name: string;
  title: string;
  subtitle?: string;
  bio: string;
  philosophy?: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  cvUrl?: string;
  availability?: boolean;
  yearsExperience?: number;
  projectsCount?: number;
  technologiesCount?: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISkill {
  _id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'AI & Automation' | 'Other';
  icon?: string;
  level?: number; // 0-100
  yearsExperience?: number;
  description?: string;
  order?: number;
  status?: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: 'Development' | 'Creative';
  technologies: string[];
  images: string[];
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
  status: 'published' | 'draft';
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExperience {
  _id?: string;
  company: string;
  position: string;
  location?: string;
  startDate: Date | string;
  endDate?: Date | string;
  current?: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  companyLogo?: string;
  order?: number;
  status?: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEducation {
  _id?: string;
  institution: string;
  degree: string;
  field?: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: Date | string;
  endDate?: Date | string;
  current?: boolean;
  grade?: string;
  description?: string;
  logo?: string;
  order?: number;
  status?: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  _id?: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  order?: number;
  status?: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAchievement {
  _id?: string;
  title: string;
  issuer?: string;
  description?: string;
  icon?: string;
  date?: Date | string;
  link?: string;
  order?: number;
  status?: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISocial {
  _id?: string;
  platform: string;
  url: string;
  icon?: string;
  order?: number;
  visible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISettings {
  _id?: string;
  siteName?: string;
  siteTagline?: string;
  darkModeDefault?: boolean;
  accentColor?: string;
  enableBlog?: boolean;
  enableTestimonials?: boolean;
  maintenanceMode?: boolean;
  googleAnalyticsId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
