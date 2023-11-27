import cookie from "cookie";
import jwt from "jsonwebtoken";
import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageControllers.js";
import User from "../models/User.js";

// Function to set up Socket.IO
const setupSocketIO = (io) => {
  //Middleware connects
  io.use(function (socket, next) {
    const cookieFromHeaders = socket.handshake.headers.cookie;
    if (cookieFromHeaders) {
      const cookies = cookie.parse(socket.handshake.headers.cookie);
      jwt.verify(
        cookies.userToken,
        process.env.SECRET_KEY,
        function (err, user) {
          if (err) return next(new Error("Authentication error"));
          socket.user = user;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    const user = await User.findById(socket.user.id);

    // user joins rooms with groupId
    user.groups.forEach((groupId) => {
      console.log("user", socket.user.id, "joined", groupId.toString());
      socket.join(groupId.toString());
    });

    // Log the connection of a user
    console.log(`User Connected: ${socket.id}`);

    getInitialMessages(socket);

    // Listen for incoming messages from the client
    socket.on("send_message", async ({ text, groupId }) => {
      console.log(socket.user.id);
      // Send the received message to the messageController for processing
      sendMessage(io, text, socket.user.id, groupId); //Socket.user.id is the id of conntected user
    });

    // Listen for disconnection events
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

// Export the setupSocketIO function
export default setupSocketIO;
