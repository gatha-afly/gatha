import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      imgName: { type: String },
      imgPath: { type: String },
      imgType: { type: String },
      imgSize: { type: Number },
      default: null,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

export default User;
