import express from "express";
import { getAllGroupMessage } from "../controllers/messageControllers.js";

const router = express.Router();

router.get("/:groupId", getAllGroupMessage);

export default router;
