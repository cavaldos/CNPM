import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  age: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["admin", "user", "instructor"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
