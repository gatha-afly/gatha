//External packages Imports
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

//Internal Imports
import connectToMongoDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

//Define the PORT variable
const PORT = process.env.PORT || 3001;

//Middlewares
const app = express();
app.set("port", PORT);
app.use(express.json());
app.use(express.static(path.resolve("./public")));

//Initializing the corsOptions
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

//Create a HTTP server
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    // Save the message in the database and broadcast it to other connected users
    // You can use Mongoose models for message storage.
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
