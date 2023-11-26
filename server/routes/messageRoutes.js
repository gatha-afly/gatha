import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageController.js";

const setupSocketIO = (io) => {
  io.on("connection", async (socket) => {
    console.log(`User Connected: ${socket.id}`);

    try {
      const messages = await getInitialMessages();
      socket.emit("init", messages);
    } catch (err) {
      console.error(err);
    }

    socket.on("message", async (msg) => {
      try {
        const message = await sendMessage(msg);
        io.emit("message", message);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default setupSocketIO;
