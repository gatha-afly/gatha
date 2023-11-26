// messageRouter.js
import cookie from "cookie";
import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageControllers.js";
import jwt from "jsonwebtoken";
import Message from "../models/Message.js";

const setupSocketIO = (io) => {
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

    getInitialMessages(io, socket); // Pass 'io' and 'socket' to getInitialMessages

    socket.on("send_message", async (data) => {
      try {
        await sendMessage(io, data.text, socket.user._id, data.room);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default setupSocketIO;
