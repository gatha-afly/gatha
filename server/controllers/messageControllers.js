import Message from "../models/Message.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import * as responseHandlerUtils from "../utils/responseHandler.js";

export const getInitialMessages = async (io, socket, groupId) => {
  try {
    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("sender", "username");

    // Reverse the order to have the oldest messages first.
    io.to(socket.id).emit("init", messages.reverse());
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const sendMessage = async (io, msg, senderId, groupId) => {
  try {
    const sender = await User.findById(senderId);
    if (!sender) {
      console.error("Sender does not exist");
      return;
    }

    const group = await Group.findById(groupId);
    if (!group) {
      console.log("The group doesn't exist with the provided groupId");
      throw new Error("The group doesn't exist with the provided groupId");
    }

    const newMessage = new Message({
      text: msg,
      sender: sender,
      group: group,
    });

    await newMessage.save();

    // Save the new message in messages array of group collection
    await responseHandlerUtils.saveGroupMessage(groupId, newMessage);

    // Populate the sender field before emitting the message to the group.
    await newMessage.populate("sender", "username");

    io.to(groupId.toString()).emit("receive_message", {
      text: newMessage,
      groupId: groupId.toString(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllGroupMessage = async (req, res) => {
  try {
    const { groupId } = req.params;

    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("sender", "username");

    return res.status(200).json(messages.reverse());
  } catch (error) {
    return res.status(500).json({ error: "Error fetching messages" });
  }
};
