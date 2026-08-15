import { Schema, models, model, Document } from 'mongoose';

export interface IEducationDoc extends Document {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  grade?: string;
  description?: string;
  logo?: string;
  order: number;
  status: 'published' | 'draft';
}

const EducationSchema = new Schema<IEducationDoc>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: String,
    location: String,
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    grade: String,
    description: String,
    logo: String,
    order: { type: Number, default: 0 },
    status: { type: String, default: 'published', enum: ['published', 'draft'] },
  },
  { timestamps: true }
);

export default models.Education || model<IEducationDoc>('Education', EducationSchema);
