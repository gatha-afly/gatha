import { Schema, model } from "mongoose";

const onlineUsersSchema = new Schema(
  {
    userId: { type: String },
    socketId: { type: String },
  },
  { timestamps: true }
);

const OnlineUsers = model("OnlineUsers", onlineUsersSchema);

export default OnlineUsers;
