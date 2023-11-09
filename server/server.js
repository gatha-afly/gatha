//External packages Imports
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

//Internal Imports
import connectToMongoDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import app from "./app.js";

dotenv.config();

//Define the PORT variable
const PORT = process.env.PORT || 3001;

//Create a HTTP server
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

//Registering Routes
app.use("/api/users", userRouter);
//app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

// Server is listening on the specified port
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
  });
});
