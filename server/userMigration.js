import connectToMongoDB from "./config/database.js";
import User from "./models/User.js";
// Data migration script
connectToMongoDB().then(async () => {
  try {
    const updatedUser = await User.find({});
    updatedUser.forEach(async (user) => {
      if (user.hasOwnProperty("is_online")) {
        return;
      }
      await user.updateOne({ is_online: false });
      console.log("Process", user._id);
    });
  } catch (error) {
    console.log(error);
  }
});
