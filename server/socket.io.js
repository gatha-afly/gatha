import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import setupSocketIO from "./routes/messageRoutes.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

// Set up Socket.io routes using the router
setupSocketIO(io);
export { httpServer, io };
