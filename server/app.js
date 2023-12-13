import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Initializing the corsOptions
app.use(
  cors({
    origin: ["http://localhost:3000", "https://gatha.netlify.app"],
    methods: ["HEAD", "GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

export default app;
