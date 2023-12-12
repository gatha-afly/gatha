import { Schema, model } from "mongoose";
import { customAlphabet } from "nanoid";
import { isCodeUnique } from "../helpers/groupHelper.js";

const groupSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  //Virtual to generate Random groupcode
  code: {
    type: String,
    default: function () {
      const generateCustomNanoid = customAlphabet(
        "ACDEFGHIJKLMNOPQRSTUVWXYZ346789"
      );
      let code;

      do {
        code = generateCustomNanoid(8);
      } while (!isCodeUnique(code));

      return code;
    },
    unique: true,
  },
  avatar: {
    imgName: { type: String },
    imgPath: { type: String },
    imgType: { type: String },
    imgSize: { type: Number },
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});
const Group = model("Group", groupSchema);
export default Group;
