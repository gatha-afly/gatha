import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import setupSocketIO from "./config/setupSocketIO.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://client-1anl.onrender.com",
      "https://gatha-dev.netlify.app",
      "https://gatha.netlify.app",
    ],
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  },
});

// Set up Socket.io routes using the router
setupSocketIO(io);
//export
export { httpServer, io };
