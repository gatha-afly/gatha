import Message from "../models/Message.js";

/**
 * Handler for getting the initial messages
 * @returns
 */
export const getInitialMessages = async (socket) => {
  try {
    // Retrieve the latest 10 messages from the database
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
export const sendMessage = async (io, msg) => {
  try {
    // Create a new message using the provided text
    const message = new Message({ text: msg });
    // Save the message to the database
    await message.save();
    // Return the saved message
    io.emit("receive_message", message);
  } catch (err) {
    // Log and throw any errors that occur during the operation
    console.error(err);
    throw err;
  }
};
