import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageControllers.js";
import socketAuthMiddleware from "../middleware/socket/socketAuthMiddleware.js";
import { isUserAlreadyGroupMember } from "../middleware/socket/isUserAlreadyGroupMember.js";
import User from "../models/User.js";
import OnlineUsers from "../models/OnlineUsers.js";

//Function to set up Socket.IO
const setupSocketIO = (io) => {
  //Middleware connects
  io.use(socketAuthMiddleware, isUserAlreadyGroupMember);

  io.on("connection", async (socket) => {
    const user = await User.findById(socket.user.id);

    // Check if the user is already in the OnlineUsers database
    const existingOnlineUser = await OnlineUsers.findOne({ userId: user.id });

    // If the user is not already in the database, save them
    if (!existingOnlineUser) {
      const onlineUser = new OnlineUsers({
        userId: user.id,
        socketId: socket.id,
      });
      await onlineUser.save();
    }

    // user joins rooms with groupId
    user.groups.forEach((groupId) => {
      console.log("user", socket.user.id, "joined", groupId.toString());
      socket.join(groupId.toString());
    });

    // Call getInitialMessages once after user joins all groups
    user.groups.forEach((groupId) => {
      getInitialMessages(io, socket, groupId);
    });

    console.log(`User Connected: ${socket.id}`);

    // Notify other clients when a user is typing
    socket.on("typing", ({ groupId }) => {
      const userTyping = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      };
      socket.to(groupId.toString()).emit("typing", { user: userTyping });
    });

    // Listen for incoming messages from the client
    socket.on("send_message", async ({ text, groupId }) => {
      console.log(socket.user.id);

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
      } catch (error) {
        // Display the error to the client
        socket.emit("error", { message: error.message });
      }
    });

    // Listen for disconnection events
    socket.on("disconnect", async () => {
      console.log("User disconnected");

      // Remove user information from the OnlineUsers database on disconnect
      await OnlineUsers.findOneAndDelete({ userId: user.id });
    });
  });
};

export default setupSocketIO;
