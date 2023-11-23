import Message from "../models/Message.js";
import User from "../models/User.js";

/**
 * Handler for broadcasting messages
 * @param {*} socket
 */
export const getInitialMessages = async (socket) => {
  try {
    // Fetch the latest messages and emit them to the new socket connection
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("sender", "username");
    socket.emit("init", messages.reverse());
  } catch (error) {
    console.error(error);
  }
};

/**
 * Hanlder sending message
 * @param {*} io
 * @param {*} msg
 */
export const sendMessage = async (io, msg, senderId) => {
  try {
    // Check if senderId exists in the User schema
    const senderExists = await User.exists({ _id: senderId });
    // if (!senderExists) {
    //   console.error("Sender does not exist");
    //   return;
    // }

    const newMessage = new Message({
      text: msg,
      sender: senderId,
    });

    await newMessage.save();

    // Populate the sender field before emitting the message
    await newMessage.populate("sender", "username");
    io.emit("message", newMessage);
  } catch (error) {
    console.error(error);
  }
};
