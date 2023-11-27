import Message from "../models/Message.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
/**
 * Handler for getting the initial messages
 * @returns
 */
export const getInitialMessages = async (socket) => {
  try {
    // Fetch the latest messages and emit them to the new socket connection
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);

    // Reverse the order to have the oldest messages first
    socket.emit("init", messages.reverse());
  } catch (err) {
    // Log and throw any errors that occur during the operation
    console.error(err);
    throw err;
  }
};
/**
 * Handler for sending a new message
 * @param {*} text
 * @returns
 */
export const sendMessage = async (io, msg, senderId, groupId) => {
  try {
    // Check if senderId exists in the User schema
    const sender = await User.exists({ _id: senderId });
    if (!sender) {
      console.error("Sender does not exist");
      return;
    }

    const group = await Group.findById(groupId);
    if (!group) {
      console.log("The group doesn't exist with provided groupId");
      throw new Error("The group doesn't exist with provided groupId");
    }

    const newMessage = new Message({
      text: msg,
      sender: sender,
      group: group,
    });

    await newMessage.save();

    // Populate the sender field before emitting the message
    await newMessage.populate("sender", "username");
    io.to(groupId).emit("receive_message", { text: newMessage, groupId });
  } catch (error) {
    console.error(error);
  }
};
