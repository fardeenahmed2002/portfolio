import { Schema, models, model, Document } from 'mongoose';

export interface ISkillDoc extends Document {
  name: string;
  category: string;
  icon?: string;
  level?: number;
  yearsExperience?: number;
  description?: string;
  order: number;
  status: 'published' | 'draft';
}

const SkillSchema = new Schema<ISkillDoc>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'AI & Automation', 'Other'],
    },
    icon: String,
    level: { type: Number, min: 0, max: 100 },
    yearsExperience: Number,
    description: String,
    order: { type: Number, default: 0 },
    status: { type: String, default: 'published', enum: ['published', 'draft'] },
  },
  { timestamps: true }
);

export default models.Skill || model<ISkillDoc>('Skill', SkillSchema);
