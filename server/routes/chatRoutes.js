import express from "express";
import {
  createChat,
  findChat,
  findUserChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/create", createChat);
router.get("/:userId", findUserChat);
router.get("/find/:firstId/:secondId", findChat);

export default router;
