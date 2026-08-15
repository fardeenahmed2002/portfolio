import { Schema, models, model, Document } from 'mongoose';

export interface IProfileDoc extends Document {
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
}

const ProfileSchema = new Schema<IProfileDoc>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: String,
    bio: { type: String, required: true },
    philosophy: String,
    email: { type: String, required: true },
    phone: String,
    location: String,
    avatar: String,
    cvUrl: String,
    availability: { type: Boolean, default: true },
    yearsExperience: { type: Number, default: 0 },
    projectsCount: { type: Number, default: 0 },
    technologiesCount: { type: Number, default: 0 },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

export default models.Profile || model<IProfileDoc>('Profile', ProfileSchema);
