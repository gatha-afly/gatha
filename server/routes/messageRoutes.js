import {
  getInitialMessages,
  sendMessage,
} from "../controllers/messageControllers.js";
import Message from "../models/Message.js";

const setupSocketIO = (io) => {
  io.on("connection", async (socket) => {
    console.log(`User Connected: ${socket.id}`);

    try {
      const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
      socket.emit("init", messages.reverse());
    } catch (err) {
      console.error(err);
    }

    socket.on("message", async (msg) => {
      try {
        const message = new Message({ text: msg });
        await message.save();
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
