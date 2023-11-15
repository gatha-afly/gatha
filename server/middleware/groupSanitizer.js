import { body } from "express-validator";
import { uppercaseFirstLetter } from "../helpers/userHelper.js";

export const validateGroupRules = [
  //Sanitize and validate group name
  body("name")
    .trim()
    .isAlpha()
    .customSanitizer((value) => uppercaseFirstLetter(value)),
];
