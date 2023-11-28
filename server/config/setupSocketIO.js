import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageControllers.js";
import socketAuthMiddleware from "../middleware/socket/socketAuthMiddleware.js";
import { isUserAlreadyGroupMember } from "../middleware/socket/isUserAlreadyGroupMember.js";
import User from "../models/User.js";

const setupSocketIO = (io) => {
  io.use(socketAuthMiddleware, isUserAlreadyGroupMember);

  io.on("connection", async (socket) => {
    const user = await User.findById(socket.user.id);

    user.groups.forEach((groupId) => {
      console.log("user", socket.user.id, "joined", groupId.toString());
      socket.join(groupId.toString());
    });

    user.groups.forEach((groupId) => {
      getInitialMessages(io, socket, groupId);
    });

    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", async ({ text, groupId }) => {
      console.log(socket.user.id);

      try {
        await sendMessage(io, text, socket.user.id, groupId);
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default setupSocketIO;
