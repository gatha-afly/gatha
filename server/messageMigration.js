import connectToMongoDB from "./config/database.js";
import Message from "./models/Message.js";

// Data migration script
connectToMongoDB().then(async () => {
  try {
    const updatedMessages = await Message.find({});
    updatedMessages.forEach(async (message) => {
      if (message.hasOwnProperty("isDeleted")) {
        return;
      }
      await message.updateOne({ isDeleted: false });
      console.log("Process", message._id);
    });
  } catch (error) {
    console.log(error);
  }
});
