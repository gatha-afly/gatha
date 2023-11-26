import Message from "../models/Message.js";

export const getInitialMessages = async () => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
    return messages.reverse();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const sendMessage = async (text) => {
  try {
    const message = new Message({ text });
    await message.save();
    return message;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
