import express from "express";
import { createGroup } from "../controllers/groupControllers.js";
import { authorizeUser } from "../middleware/userAuthorization.js";
import { validator } from "../middleware/validator.js";
import { validateGroupRules } from "../middleware/groupSanitizer.js";

const router = express.Router();

// Protected endpoint
router.use(authorizeUser);
router.post(
  "/create-group/:userId",
  validateGroupRules,
  validator,
  createGroup
);

export default router;
