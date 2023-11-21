import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageControllers.js";

// Set up Socket.IO event handlers for a new connection
const setupSocketIO = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Send the initial set of messages to the new connection
    getInitialMessages(socket);

    // Listen for incoming messages and broadcast them to all clients
    socket.on("message", async (msg) => {
      sendMessage(io, msg);
    });

    // Handle disconnection events
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default setupSocketIO;
