import express from "express";
import { createGroup } from "../controllers/groupControllers.js";
import { authorizeUser } from "../middleware/userAuthorization.js";

const router = express.Router();

// Protected endpoint
router.use(authorizeUser);
router.post("/create-group/:userId", createGroup);

export default router;
