import connectToMongoDB from "./config/database.js";
import mongoose from "mongoose";
import Group from "./models/Group.js";

// Data migration script
connectToMongoDB().then(async () => {
  try {
    const updatedGroups = await Group.find({});
    for (const group of updatedGroups) {
      if (group.hasOwnProperty("groupAdmins")) {
        continue;
      }

      // Ensure that groupAdmins is an array of ObjectIds
      group.groupAdmins = [mongoose.Types.ObjectId]; // Replace mongoose.Types.ObjectId() with the actual ObjectId of the user.

      await group.save();
      console.log("Process", group._id);
    }
  } catch (error) {
    console.log(error);
  }
});
