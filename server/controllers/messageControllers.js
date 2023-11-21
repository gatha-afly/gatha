// controller.js
import Message from "../models/Message.js";
/**
 * Handler for broadcasting messages
 * @param {*} socket
 */
export const getInitialMessages = async (socket) => {
  try {
    // Fetch the latest messages and emit them to the new socket connection
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
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
export const sendMessage = async (io, msg) => {
  // Create a new message, save it to the database, and broadcast it to all connected clients
  const newMessage = new Message({ text: msg });
  await newMessage.save();
  io.emit("message", newMessage);
};
