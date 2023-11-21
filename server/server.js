// External packages Imports
import dotenv from "dotenv";

// Internal Imports
import connectToMongoDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import healthRouter from "./routes/healthRoutes.js";
import { httpServer } from "./socket.io.js";
import app from "./app.js";

dotenv.config();

// Define the PORT variable
const PORT = process.env.PORT || 3001;

// Registering Routes
app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);
app.use("/api/health", healthRouter);

// Server is listening on the specified port
connectToMongoDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
  });
});
