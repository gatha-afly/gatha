import {
  getInitialMessages,
  sendMessage,
  getUserStatus,
} from "../controllers/messageControllers.js";
import socketAuthMiddleware from "../middleware/socket/socketAuthMiddleware.js";
import { isUserAlreadyGroupMember } from "../middleware/socket/isUserAlreadyGroupMember.js";
import User from "../models/User.js";

// Function to set up Socket.IO
const setupSocketIO = (io) => {
  // Middleware connects
  io.use(socketAuthMiddleware, isUserAlreadyGroupMember);

  io.on("connection", async (socket) => {
    // Retrieve the user based on the socket user id
    const user = await User.findById(socket.user.id);

    // Check if a user is found
    if (user) {
      // On connection set the (is_online === true)
      await User.findByIdAndUpdate(user._id, { is_online: true });

      // user joins rooms with groupId
      user.groups.forEach((groupId) => {
        socket.join(groupId.toString());
      });

      // Call getInitialMessages once after the user joins all groups
      user.groups.forEach((groupId) => {
        getInitialMessages(io, socket, groupId);
        getUserStatus(io, socket, groupId);

        // Notify other clients when a user is typing
        socket.on("typing", ({ groupId }) => {
          const userTyping = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
          };
          socket
            .to(groupId.toString())
            .emit("typing", { user: userTyping, groupId: groupId });
        });

        // Notify other clients when a user stops typing
        socket.on("stop_typing", ({ groupId }) => {
          const userStoppedTyping = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
          };
          socket
            .to(groupId.toString())
            .emit("stop_typing", { user: userStoppedTyping, groupId: groupId });
        });
      });

      console.log(`User Connected: ${socket.id}`);

      // Listen for incoming messages from the client
      socket.on("send_message", async ({ text, groupId }, acknowledgment) => {
        const userSendingMessage = {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        };

        // Notify other clients when a user stops typing
        socket
          .to(groupId.toString())
          .emit("stop_typing", { user: userSendingMessage });

        // Send the received message to the messageController for processing
        try {
          // Socket.user.id is the id of the connected user
          await sendMessage(io, text, socket.user.id, groupId);

          // Send acknowledgment back to the client indicating success
          acknowledgment({ success: true });
        } catch (error) {
          // Send acknowledgment back to the client with the error message
          acknowledgment({ error: error.message });
        }
      });

      // Listen for disconnection events
      socket.on("disconnect", async () => {
        // On disconnect set the (is_online === false)
        await User.findByIdAndUpdate(user._id, { is_online: false });
        console.log("User disconnected");

        user.groups.forEach((groupId) => {
          getUserStatus(io, socket, groupId);

          const userStoppedTyping = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
          };
          socket
            .to(groupId.toString())
            .emit("stop_typing", { user: userStoppedTyping, groupId: groupId });
        });
      });
    } else {
      // Handle the case where the user is not found
      console.log("User not found");
    }
  });
};

export default setupSocketIO;
