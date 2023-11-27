import cookie from "cookie";
import jwt from "jsonwebtoken";
import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageControllers.js";

import socketAuthMiddleware from "../middleware/socket/socketAuthMiddleware.js";
import { isUserAlreadyGroupMember } from "../middleware/socket/isUserAlreadyGroupMember.js";
import User from "../models/User.js";

// Function to set up Socket.IO
const setupSocketIO = (io) => {
  //Middleware connects
  io.use(socketAuthMiddleware, isUserAlreadyGroupMember);

  io.on("connection", async (socket) => {
    const user = await User.findById(socket.user.id);

    // user joins rooms with groupId
    user.groups.forEach((groupId) => {
      console.log("user", socket.user.id, "joined", groupId.toString());
      socket.join(groupId.toString());
    });

    // Log the connection of a user
    console.log(`User Connected: ${socket.id}`);

    getInitialMessages(socket, user.groups);

    // Listen for incoming messages from the client
    socket.on("send_message", async ({ text, groupId }) => {
      console.log(socket.user.id);
      // Send the received message to the messageController for processing
      try {
        await sendMessage(io, text, socket.user.id, groupId); // Socket.user.id is the id of connected user
      } catch (error) {
        // Display the error to the client
        socket.emit("error", { message: error.message });
      }
    });

    // Listen for disconnection events
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

// Export the setupSocketIO function
export default setupSocketIO;
