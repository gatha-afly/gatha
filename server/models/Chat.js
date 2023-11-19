import { Schema, model } from "mongoose";

const chatSchema = new Schema({ members: Array }, { timestamps: true });

const Chat = model("Chat", chatSchema);

export default Chat;
