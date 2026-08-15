import { Schema, models, model, Document } from 'mongoose';

export interface IMessageDoc extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
}

const MessageSchema = new Schema<IMessageDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: String,
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Message || model<IMessageDoc>('Message', MessageSchema);
