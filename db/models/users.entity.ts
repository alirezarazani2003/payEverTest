import { Schema, model } from 'mongoose';

export interface UserI {
  id: number;
  name: string;
  job: string;
  avatar?: string;
}

const userSchema = new Schema<UserI>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  job: { type: String, required: true },
  avatar: { type: String, required: false },
});

export const User = model<UserI>('User', userSchema);
