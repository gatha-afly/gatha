import express from "express";
import { getAllGroupMessage } from "../controllers/messageControllers.js";
import { authorizeUser } from "../middleware/express/userAuthorization.js";

const router = express.Router();

router.use(authorizeUser);
router.get("/:groupId", getAllGroupMessage);

export default router;
