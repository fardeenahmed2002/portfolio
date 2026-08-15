import { Schema, models, model, Document } from 'mongoose';

export interface IAchievementDoc extends Document {
  title: string;
  description?: string;
  icon?: string;
  date?: Date;
  link?: string;
  order: number;
  status: 'published' | 'draft';
}

const AchievementSchema = new Schema<IAchievementDoc>(
  {
    title: { type: String, required: true },
    description: String,
    icon: String,
    date: Date,
    link: String,
    order: { type: Number, default: 0 },
    status: { type: String, default: 'published', enum: ['published', 'draft'] },
  },
  { timestamps: true }
);

export default models.Achievement || model<IAchievementDoc>('Achievement', AchievementSchema);
