import { body } from "express-validator";
import {
  uppercaseFirstLetter,
  checkUserExistenceByEmail,
  checkUserExistenceByUsername,
} from "../../helpers/userHelper.js";

export const validateUserRules = [
  //Sanitize and validate the firstname and lastname

  body(["firstName", "lastName"])
    .trim()
    .isAlpha("en-GB", { ignore: "" }) //ignores the sapces
    .customSanitizer((value) => uppercaseFirstLetter(value))
    .withMessage("The first name and last name shouldn't contain numbers"),

  //Sanitizes and validate the username
  body("username")
    .trim()
    .isAlphanumeric()
    .isLength({ max: 20 })
    .withMessage("Username can be maximum 20 characters.")
    //Custom Validator to check if a username already existed
    .custom(async (value) => checkUserExistenceByUsername(value)),

  //Sanitize and validate the user email
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail() // Normalize email address
    .customSanitizer((value) => value.toLowerCase()) // Convert the email to all lowercase
    .custom(async (value) => checkUserExistenceByEmail(value)),

  //Sanitize and validate the user password
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters, at least one lowercase letter, at least one uppercase letter, at least one number, and at least one symbol."
    ),
];
