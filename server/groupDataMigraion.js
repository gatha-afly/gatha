import connectToMongoDB from "./config/database.js";
import Group from "./models/Group.js";

// Data migration script
connectToMongoDB().then(async () => {
  try {
    const updatedGroups = await Group.find({ is_removed: { $exists: true } });

    for (const group of updatedGroups) {
      // Update the is_removed field to undefined
      await Group.updateOne(
        { _id: group._id },
        { $set: { is_removed: undefined } }
      );

      console.log("Proceed", group._id);
    }
  } catch (error) {
    console.log(error);
  }
});
