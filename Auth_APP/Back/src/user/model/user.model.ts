import { ROLE, STATUS } from '../../utils/enum';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 255,
      minlength: 6,
    },
    password: { type: String, select: false },
    phoneNumber: { type: String },
    role: {
      type: String,
      default: ROLE.user,
    },

    status: {
      type: String,
      default: STATUS.activated,
    },
  },
  { timestamps: true },
);
export class User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  status: string;
}
