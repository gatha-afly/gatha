import Message from "../models/Message.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import * as responseHandlerUtils from "../utils/responseHandler.js";

/**
 *Handler for gettting the intial message when a user joins or reconnects to a group
 * @param {*} io
 * @param {*} socket
 * @param {*} groupId
 */
export const getInitialMessages = async (io, socket, groupId) => {
  try {
    // Fetch the latest messages for the specified group and populate the sender field with usernames.
    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("sender", "-password -groups"); //Exclude the password and groups

    // Reverse the order to have the oldest messages first.
    io.to(socket.id).emit("init", messages.reverse());
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Handler for sending a new message within a group
 * @param {*} io
 * @param {*} msg
 * @param {*} senderId
 * @param {*} groupId
 * @returns
 */
export const sendMessage = async (io, msg, senderId, groupId) => {
  try {
    // Check if the senderId exists in the User schema.
    const sender = await User.findById(senderId).select("-password -groups"); //Exclude password and groups
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

    // Create a new message with the provided text, sender, and group
    const newMessage = new Message({
      text: msg,
      sender: sender,
      group: group,
    });

    // Save the new message to the database
    await newMessage.save();

    // Save the new message in messages array of group collection
    await responseHandlerUtils.saveGroupMessage(groupId, newMessage);

    // Populate the sender field before emitting the message to the group.
    await newMessage.populate("sender", "-password -groups"); //Exclude password and groups

    io.to(groupId.toString()).emit("receive_message", {
      text: newMessage,
      groupId: groupId.toString(),
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Handler for gettting all the group messages based on provided groupId
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllGroupMessage = async (req, res) => {
  try {
    const { groupId } = req.params;

    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("sender", "-password -groups"); //Exclude the password and groups

    return res.status(200).json(messages.reverse());
  } catch (error) {
    return res.status(500).json({ error: "Error fetching messages" });
  }
};
