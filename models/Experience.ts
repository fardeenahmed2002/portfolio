import { Schema, models, model, Document } from 'mongoose';

export interface IExperienceDoc extends Document {
  company: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  companyLogo?: string;
  order: number;
  status: 'published' | 'draft';
}

const ExperienceSchema = new Schema<IExperienceDoc>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: String,
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    description: String,
    responsibilities: [{ type: String }],
    technologies: [{ type: String }],
    companyLogo: String,
    order: { type: Number, default: 0 },
    status: { type: String, default: 'published', enum: ['published', 'draft'] },
  },
  { timestamps: true }
);

export default models.Experience || model<IExperienceDoc>('Experience', ExperienceSchema);
