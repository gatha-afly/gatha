import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/messageControllers.js";

const router = express.Router();

router.post("/create-message", createMessage);
router.get("/get-message/:chatId", getMessages);

export default router;
