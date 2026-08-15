import { Schema, models, model, Document } from 'mongoose';

export interface IServiceDoc extends Document {
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  order: number;
  status: 'published' | 'draft';
}

const ServiceSchema = new Schema<IServiceDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: String,
    features: [{ type: String }],
    order: { type: Number, default: 0 },
    status: { type: String, default: 'published', enum: ['published', 'draft'] },
  },
  { timestamps: true }
);

export default models.Service || model<IServiceDoc>('Service', ServiceSchema);
