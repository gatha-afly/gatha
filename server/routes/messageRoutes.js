import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageController.js";

// Function to set up Socket.IO
const setupSocketIO = (io) => {
  io.on("connection", async (socket) => {
    // Log the connection of a user
    console.log(`User Connected: ${socket.id}`);

    try {
      // Get the initial messages and emit them to the connected client
      const messages = await getInitialMessages();
      socket.emit("init", messages);
    } catch (err) {
      // Log any errors that occur during the operation
      console.error(err);
    }

    // Listen for incoming messages from the client
    socket.on("message", async (msg) => {
      try {
        // Send the received message to the messageController for processing
        const message = await sendMessage(msg);
        // Broadcast the message to all connected clients
        io.emit("message", message);
      } catch (err) {
        // Log any errors that occur during the operation
        console.error(err);
      }
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
