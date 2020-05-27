import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  comparePassword(password: string): boolean;

  name: string;
  email: string;
  password: string;
  serial: string;
  socialClub: string;
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  serial: { type: String, required: true },
  socialClub: { type: String, required: true },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (this: User): void {
  this.password = bcryptjs.hashSync(this.password, 10);
});

UserSchema.methods.comparePassword = function (password: string): boolean {
  return bcryptjs.compareSync(password, this.password);
};

const User = mongoose.model<User>('User', UserSchema);
export default User;
