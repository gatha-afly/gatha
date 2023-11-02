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
    },
    deactivate: {
      isDeactivated: { type: Boolean, default: false },
      deactivateDate: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
