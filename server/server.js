import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./config/database.js";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3001);
app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
// Server is listening on port 3001
connectToMongoDB().then(() => {
  app.listen(3001, () => {
    console.log("Server is listening on port", 3001);
  });
});
