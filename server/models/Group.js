import { Schema, model } from "mongoose";

const groupSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  avatar: {
    imgName: { type: String },
    imgPath: { type: String },
    imgType: { type: String },
    imgSize: { type: Number },
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admin: { type: Schema.Types.ObjectId, ref: "User" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});
const Group = model("Group", groupSchema);
export default Group;
