import express from "express";
import path from "path";
import cors from "cors";

const app = express();

//Define the PORT variable
const PORT = process.env.PORT || 3001;

// Middlewares
app.set("port", PORT);
app.use(express.json());
app.use(express.static(path.resolve("./public")));

// Initializing the corsOptions
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

export default app;
