import express from "express";
import { createMessage } from "../controllers/messageControllers.js";

const router = express.Router();

router.post("/send-message/:authorId", createMessage);

export default router;
