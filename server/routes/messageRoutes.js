import cookie from "cookie";
import jwt from "jsonwebtoken";
import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageController.js";

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
    // Log the connection of a user
    console.log(`User Connected: ${socket.id}`);

    // Get the initial messages and emit them to the connected client
    getInitialMessages(socket);

    // Listen for incoming messages from the client
    socket.on("send_message", async (msg) => {
      // Send the received message to the messageController for processing
      sendMessage(io, msg);
    });

    // Listen for disconnection events
    socket.on("disconnect", () => {
      // Log when a user disconnects
      console.log("User disconnected");
    });
  });
};

// Export the setupSocketIO function
export default setupSocketIO;
