// External packages Imports
import dotenv from "dotenv";

// Internal Imports
import connectToMongoDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import healthRouter from "./routes/healthRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import onlineUserRouter from "./routes/onlineUsersRoutes.js";
import { httpServer } from "./socket.io.js";
import app from "./app.js";

dotenv.config();

// Define the PORT variable
const PORT = process.env.PORT || 3001;

// Registering Routes
app.use("/api/users", userRouter);
app.use("/api/users/online", onlineUserRouter);
app.use("/api/groups", groupRouter);
app.use("/api/health", healthRouter);
app.use("/api/messages", messageRouter);

// Server is listening on the specified port
connectToMongoDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
  });
});
