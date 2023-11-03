import { body } from "express-validator";
import {
  uppercaseFirstLetter,
  checkUserExistence,
} from "../helpers/userHelper.js";

export const validateUserRules = [
  //Sanitize and validate the firstname and lastname

  body(["firstName", "lastName"])
    .trim()
    .isAlpha()
    .customSanitizer((value) => uppercaseFirstLetter(value)),

  //Sanitize and validate the user email
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail({ gmail_remove_subaddress: true })
    .custom(async (value) => checkUserExistence(value)),

  //Sanitize and validate the user password
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters, at least one lowercase letter, at least one uppercase letter, at least one number, and at least one symbol."
    ),
];
