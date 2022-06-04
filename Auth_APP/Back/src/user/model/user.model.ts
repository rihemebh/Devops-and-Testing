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
    password: { type: String},
    phoneNumber: { type: String },


      }
);
export class User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}
