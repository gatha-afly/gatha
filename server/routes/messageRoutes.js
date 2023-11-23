import cookie from "cookie";
import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageControllers.js";

import jwt from "jsonwebtoken";

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

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    console.log(socket.user);

    // Send the initial set of messages to the new connection
    getInitialMessages(socket);

    // Listen for incoming messages and broadcast them to all clients
    socket.on("send_message", async ({ text }) => {
      console.log(socket.user.id);
      sendMessage(io, text, socket.user.id);
    });

    // Handle disconnection events
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default setupSocketIO;
