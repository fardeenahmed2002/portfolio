import { Schema, models, model, Document } from 'mongoose';

export interface ISocialDoc extends Document {
  platform: string;
  url: string;
  icon?: string;
  order: number;
  visible: boolean;
}

const SocialSchema = new Schema<ISocialDoc>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: String,
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Social || model<ISocialDoc>('Social', SocialSchema);
