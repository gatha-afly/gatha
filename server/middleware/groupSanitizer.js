import { body } from "express-validator";
import {
  checkUserExistenceByUsername,
  uppercaseFirstLetter,
} from "../helpers/userHelper.js";
import { checkGroupExistence } from "../helpers/groupHelper.js";

export const validateGroupRules = [
  //Sanitize and validate group name
  body("name")
    .trim()
    .isAlpha()
    .customSanitizer((value) => uppercaseFirstLetter(value))
    .custom(async (value) => checkGroupExistence(value)),
];
