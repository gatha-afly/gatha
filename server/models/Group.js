import { Schema, model } from "mongoose";

const groupSchema = new Schema({
  groupName: { type: String, required: true },
  groupDescription: { type: String },
  groupAvatar: {
    imgName: { type: String },
    imgPath: { type: String },
    imgType: { type: String },
    imgSize: { type: Number },
  },
  groupMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  groupAdmin: { type: Schema.Types.ObjectId, ref: "User" },
  groupMessages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});
const Group = model("Group", groupSchema);
export default Group;
