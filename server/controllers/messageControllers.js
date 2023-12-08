import Message from "../models/Message.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import * as responseHandlerUtils from "../utils/responseHandler.js";
import * as errorHandlerUtils from "../utils/errorHandler.js";
import { StatusCodes } from "http-status-codes";

/**
 *Handler for getting the initial message when a user joins or reconnects to a group
 * @param {*} io
 * @param {*} socket
 * @param {*} groupId
 */
export const getInitialMessages = async (io, socket, groupId) => {
  try {
    // Fetch the latest messages for the specified group and populate the sender field with desired fields.
    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: -1 })
      .populate({
        path: "sender",
        select: "id firstName lastName username email",
      });

    // Reverse the order to have the oldest messages first.
    const formattedMessages = messages.map((message) => ({
      ...message.toObject(),
      sender: message.sender
        ? {
            id: message.sender.id,
            firstName: message.sender.firstName,
            lastName: message.sender.lastName,
            username: message.sender.username,
            email: message.sender.email,
          }
        : null,
    }));

    // Emit the formatted messages to the socket
    io.to(socket.id).emit("init", formattedMessages.reverse());
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Handler to retrieve and send the online status of group members to a specific socket
 * @param {*} io
 * @param {*} socket
 * @param {*} groupId
 */
export const getUserStatus = async (io, socket, groupId) => {
  try {
    // Retrieve group members information, excluding their passwords
    const groupMembers = await Group.findById(groupId).populate(
      "members",
      "_id, is_online"
    );

    // Filter members who are currently online and extract their user IDs
    const onlineUsers = groupMembers.members
      .filter((member) => member.is_online) // Exclude the current socket user
      .map((member) => member._id.toString());

    // Emit an event to the specified socket with the list of online user IDs
    io.to(groupId.toString()).emit("get_online_users", {
      onlineUsers,
      groupId,
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.error(error);
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

    // Populate the sender field with additional details before emitting the message to the group.
    await newMessage.populate({
      path: "sender",
      select: "id firstName lastName username email",
    });

    io.to(groupId.toString()).emit("receive_message", {
      text: {
        ...newMessage.toObject(),
        sender: newMessage.sender
          ? {
              id: newMessage.sender.id,
              firstName: newMessage.sender.firstName,
              lastName: newMessage.sender.lastName,
              username: newMessage.sender.username,
              email: newMessage.sender.email,
            }
          : null,
      },
      groupId: groupId.toString(),
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Handler for getting all the group messages based on provided groupId
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllGroupMessage = async (req, res) => {
  try {
    // Extract groupId from request parameters
    const { groupId } = req.params;

    // Retrieve messages for the specified group, sorted by createdAt, and populate the sender details
    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: -1 })
      .populate({
        path: "sender",
        select: "id firstName lastName username email",
      });

    // Format messages and include sender details in the response
    const formattedMessages = messages.map((message) => ({
      ...message.toObject(),
      sender: message.sender
        ? {
            id: message.sender.id,
            firstName: message.sender.firstName,
            lastName: message.sender.lastName,
            username: message.sender.username,
            email: message.sender.email,
          }
        : null,
    }));

    // Respond with the formatted messages in reverse order
    return res.status(StatusCodes.OK).json(formattedMessages.reverse());
  } catch (error) {
    // Log and handle internal errors
    console.error("Error:", error);
    return errorHandlerUtils.handleInternalError(res);
  }
};

/**
 * Handler for deleting the messages by providing groupId and userId
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteMessage = async (req, res) => {
  try {
    const { messageId, senderId } = req.params;

    // Checks the senderId is the actual sender of the message
    const isSender = await responseHandlerUtils.IsSenderOfMessage(
      messageId,
      senderId
    );

    if (!isSender) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You are not authorized to delete this message",
      });
    }

    await Message.findByIdAndUpdate(messageId, { isDeleted: true });

    return res.status(StatusCodes.OK).json({
      message: "The target message has been removed",
    });
  } catch (error) {
    return errorHandlerUtils.handleInternalError(res);
  }
};

/**
 * Handler for editing message
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const editMessage = async (req, res) => {
  try {
    const { messageId, senderId } = req.params;
    const { text } = req.body;

    const isSender = await responseHandlerUtils.IsSenderOfMessage(
      messageId,
      senderId
    );

    if (!isSender) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You are not authorized to delete this message",
      });
    }

    const editedMessage = await Message.findByIdAndUpdate(
      messageId,
      {
        text,
      },
      { new: true }
    );

    return res
      .status(StatusCodes.OK)
      .json({ message: "The message was edited successfully!", editedMessage });
  } catch (error) {
    console.error(error); // Log
    return errorHandlerUtils.handleInternalError(res);
  }
};
