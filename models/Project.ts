import { Schema, models, model, Document } from 'mongoose';

export interface IProjectDoc extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  images: string[];
  thumbnail?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  status: 'published' | 'draft';
  startDate?: Date;
  endDate?: Date;
}

const ProjectSchema = new Schema<IProjectDoc>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: String,
    category: {
      type: String,
      required: true,
      enum: ['Development', 'Creative'],
    },
    technologies: [{ type: String }],
    images: [{ type: String }],
    thumbnail: String,
    liveUrl: String,
    githubUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, default: 'draft', enum: ['published', 'draft'] },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

export default models.Project || model<IProjectDoc>('Project', ProjectSchema);
