import express from "express";
import {
  getAllGroupMessage,
  deleteMessage,
} from "../controllers/messageControllers.js";
import { authorizeUser } from "../middleware/express/userAuthorization.js";

const router = express.Router();

router.use(authorizeUser);
router.get("/:groupId", getAllGroupMessage);
router.delete("/delete/:messageId/:senderId", deleteMessage);

export default router;
