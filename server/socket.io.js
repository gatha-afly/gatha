import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

export { httpServer, io };
