import express from "express";
import { getOnlineUser } from "../controllers/onlineUsersController.js";
import { authorizeUser } from "../middleware/express/userAuthorization.js";

const router = express.Router();

//Protect Routes
router.use(authorizeUser);

router.get("/:userId", getOnlineUser);

export default router;
