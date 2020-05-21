import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  comparePassword(password: string): Boolean;

  name: string;
  age: number;
  gender: boolean;
  money: BigInteger;
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: Boolean, required: true },
  age: { type: Number, required: true, default: 17 },
  money: { type: Number, required: true, default: 0 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (this: User): void {
  this.password = bcrypt.hashSync(this.password, 10);
});

UserSchema.methods.comparePassword = function (password: String): Boolean {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model<User>('User', UserSchema);
export default User;