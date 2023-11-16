import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Define the PORT variable
const PORT = process.env.PORT || 3001;

// Middlewares
app.set("port", PORT);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use("/uploads", express.static("./uploads"));

// Initializing the corsOptions
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

export default app;
