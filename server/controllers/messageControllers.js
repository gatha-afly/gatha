// messageControllers.js
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getInitialMessages = async (io, socket) => {
  try {
    const messages = await Message.find({ room: { $in: socket.rooms } })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("sender", "username");

    io.to(socket.id).emit("init", messages.reverse()); // Emit to the specific socket
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (io, text, senderId, room) => {
  try {
    const senderExists = await User.exists({ _id: senderId });

    if (!senderExists) {
      console.error("Sender does not exist");
      return;
    }

    const newMessage = new Message({
      text: text,
      sender: senderId,
      room: room,
    });

    await newMessage.save();

    await newMessage.populate("sender", "username").execPopulate();
    io.to(room).emit("receive_message", newMessage);
  } catch (error) {
    console.error(error);
  }
};
