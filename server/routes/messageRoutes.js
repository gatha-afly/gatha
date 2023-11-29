import express from "express";
import {
  getAllGroupMessage,
  deleteMessage,
  editMessage,
} from "../controllers/messageControllers.js";
import { authorizeUser } from "../middleware/express/userAuthorization.js";

const router = express.Router();

router.use(authorizeUser);
router.get("/:groupId", getAllGroupMessage);
router.delete("/delete/:messageId/:senderId", deleteMessage);
router.patch("/edit/:messageId/:senderId", editMessage);

export default router;
