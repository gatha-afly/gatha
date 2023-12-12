import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    img: {
      imgName: { type: String },
      imgPath: { type: String },
      imgType: { type: String },
      imgSize: { type: Number },
    },
    gif: {
      gifName: { type: String },
      gifPath: { type: String },
      gifType: { type: String },
      gifSize: { type: Number },
    },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
export default Message;
