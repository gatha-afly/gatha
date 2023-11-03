import express from "express";
import { createUser } from "../controllers/userControllers.js";
import { validator } from "../middleware/validator.js";
import { validateUserRules } from "../middleware/userSanitizer.js";

const router = express.Router();

//Unprotect Routes
router.post("/register", validateUserRules, validator, createUser);

export default router;
