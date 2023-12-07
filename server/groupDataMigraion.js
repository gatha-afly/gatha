import connectToMongoDB from "./config/database.js";
import Group from "./models/Group.js";

// Data migration script
connectToMongoDB().then(async () => {
  try {
    const updatedGroups = await Group.find({});
    for (const group of updatedGroups) {
      if (group.hasOwnProperty("admin")) {
        continue;
      }

      group.admin = undefined;

      await group.save();
      console.log("Process", group._id);
    }
  } catch (error) {
    console.log(error);
  }
});
