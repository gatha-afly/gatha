import { body } from "express-validator";
import {
  uppercaseFirstLetter,
  checkUserExistence,
} from "../helpers/userHelper.js";

export const validateUserRules = [
  //Sanitize and validate the firstname and lastname

  body(["firstName", "lastName"])
    .trim()
    .isAlpha("en-GB", { ignore: "" }) //ignores the sapces
    .customSanitizer((value) => uppercaseFirstLetter(value)),

  //Sanitizes and validate the username
  body("username").trim().isAlphanumeric(),

  //Sanitize and validate the user email
  body("email")
    .trim()
    .isEmail()
    .custom(async (value) => checkUserExistence(value)),

  //Sanitize and validate the user password
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters, at least one lowercase letter, at least one uppercase letter, at least one number, and at least one symbol."
    ),
];
