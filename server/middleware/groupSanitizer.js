import { body } from "express-validator";
import { uppercaseFirstLetter } from "../helpers/userHelper.js";
/* import { isCodeUnique } from "../helpers/groupHelper.js"; */

export const validateGroupRules = [
  //Sanitize and validate group name
  body("name")
    .trim()
    .isAlpha("en-GB", { ignore: " " }) //ignores the spaces
    .customSanitizer((value) => uppercaseFirstLetter(value)),
];
