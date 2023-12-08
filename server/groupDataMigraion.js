import connectToMongoDB from "./config/database.js";
import Group from "./models/Group.js";

// Data migration script
connectToMongoDB().then(async () => {
  try {
    const updatedGroups = await Group.find({});

    for (const group of updatedGroups) {
      if (group.hasOwnProperty("is_removed")) {
        continue;
      }

      await Group.updateOne({ is_removed: false });
      console.log("Proceed", group._id);
    }
  } catch (error) {
    console.log(error);
  }
});
