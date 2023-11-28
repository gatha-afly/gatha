import Message from "../models/Message.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import * as responseHandlerUtils from "../utils/responseHandler.js";

/**
 * Handler for getting the initial messages when a user joins or reconnects to a group.
 * @param {Object} io - Socket.IO server instance.
 * @param {Object} socket - Individual socket connection for a user.
 * @param {string} groupId - Unique identifier for the group.
 * @returns {Promise<void>}
 */
export const getInitialMessages = async (io, socket, groupId) => {
  try {
    // Fetch the latest messages for the specified group and populate the sender field with usernames.
    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("sender", "username");

    // Reverse the order to have the oldest messages first.
    socket.to(groupId.toString()).emit("init", messages);
  } catch (err) {
    // Log and throw any errors that occur during the operation.
    console.error(err);
    throw err;
  }
};
/**
 * Handler for sending a new message within a group.
 * @param {Object} io - Socket.IO server instance.
 * @param {string} msg - Text of the new message.
 * @param {string} senderId - Unique identifier for the message sender.
 * @param {string} groupId - Unique identifier for the group.
 * @returns {Promise<void>}
 */
export const sendMessage = async (io, msg, senderId, groupId) => {
  try {
    // Check if the senderId exists in the User schema.
    const sender = await User.findById(senderId);
    if (!sender) {
      console.error("Sender does not exist");
      return;
    }

    // Check if the group exists with the provided groupId.
    const group = await Group.findById(groupId);
    if (!group) {
      console.log("The group doesn't exist with the provided groupId");
      throw new Error("The group doesn't exist with the provided groupId");
    }

    // Create a new message with the provided text, sender, and group.
    const newMessage = new Message({
      text: msg,
      sender: sender,
      group: group,
    });

    // Save the new message to the database.
    await newMessage.save();

    await responseHandlerUtils.saveGroupMessage(groupId, newMessage);

    // Populate the sender field before emitting the message to the group.
    await newMessage.populate("sender", "username");
    io.to(groupId.toString()).emit("receive_message", {
      text: newMessage,
      groupId: groupId.toString(),
    });
  } catch (error) {
    // Log any errors that occur during the process.
    console.error(error);
  }
};
