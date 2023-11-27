import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  updateProfilePicture,
} from "../controllers/userControllers.js";
import { validator } from "../middleware/express/validator.js";
import { validateUserRules } from "../middleware/express/userSanitizer.js";
import { authorizeUser } from "../middleware/express/userAuthorization.js";
import upload from "../config/multer.js";

const router = express.Router();

//Unprotect Routes
router.post("/register", validateUserRules, validator, createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

//Protect Routes
router.use(authorizeUser);
router.patch(
  "/upload-profile/:userId",
  upload.single("image"),
  updateProfilePicture
);

export default router;
