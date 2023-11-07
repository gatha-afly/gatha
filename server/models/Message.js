import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    message: {
      text: { type: String, required: true },
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
    },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);
export default Message;
