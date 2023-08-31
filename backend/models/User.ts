import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  role: string;
  approved: boolean;
}

const userSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  company: { type: String },
  phone: { type: String },
  role: { type: String, default: '' },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
