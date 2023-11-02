import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./config/database.js";

dotenv.config();

const app = express();

// Define the PORT variable
const PORT = process.env.PORT || 3001;
app.set("port", PORT);

//Initializing the corsOptions
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

// Server is listening on the specified port
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
  });
});
