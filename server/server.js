import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

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

app.use("/api/users", userRouter);
//app.use("/api/messages", messageRouter);

// Server is listening on the specified port
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
  });
});
