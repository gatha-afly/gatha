// External packages Imports
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import path from "path"; // Import path for file paths

// Internal Imports
import connectToMongoDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import healthRouter from "./routes/healthRoutes.js";
import app from "./app.js";

dotenv.config();

// Define the PORT variable
const PORT = process.env.PORT || 3001;

// Create a HTTP server
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a room
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  // Listen for chat messages
  socket.on("chatMessage", (message) => {
    io.to(message.room).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Registering Routes
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/groups", groupRouter);
app.use("/api/health", healthRouter);

// Server is listening on the specified port
connectToMongoDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
  });
});
