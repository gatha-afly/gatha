//External packages Imports
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Internal Imports
import connectToMongoDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

//Create a HTTP server
const httpServer = http.createServer(app);

//Initialize socket.io on top the server
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5500"],
  },
});

// Define the PORT variable
const PORT = process.env.PORT || 3001;

app.set("port", PORT);

app.use(express.json());
//Initializing the corsOptions
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

//Registering Routes
app.use("/api/users", userRouter);
//app.use("/api/messages", messageRouter);

// Server is listening on the specified port
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
  });
});
