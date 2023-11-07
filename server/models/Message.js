import { Schema, model } from "mongoose";

const messageSchema = new Schema({});

const Message = model("Message", messageSchema);
export default Message;
