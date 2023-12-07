import { Schema, model } from "mongoose";
import { DateTime } from "luxon";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_online: { type: Boolean, default: false },
    avatar: {
      imgName: { type: String },
      imgPath: { type: String },
      imgType: { type: String },
      imgSize: { type: Number },
    },
    deactivate: {
      isDeactivated: { type: Boolean, default: false },
      deactivateDate: { type: Date, default: Date.now },

      //Virtual filed to calculate the expiration data
      expirationDate: {
        type: Date,
        get: function () {
          //Calculate the expiration date 2 weeks from deactivation date using Luxon
          const deactivateDate = DateTime.fromJSDate(
            this.deactivateDate
          ).setZone("UTC"); //Set Universal Time
          const expirationDate = deactivateDate.plus({ weeks: 2 });
          return expirationDate.toJSDate();
        },
      },
    },
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
