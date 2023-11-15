import { body } from "express-validator";
import { uppercaseFirstLetter } from "../helpers/userHelper.js";
/* import { isCodeUnique } from "../helpers/groupHelper.js"; */

export const validateGroupRules = [
  //Sanitize and validate group name
  body("name")
    .trim()
    .isAlpha("en-GB", { ignore: " " }) //ignores the spaces
    .customSanitizer((value) => uppercaseFirstLetter(value)),

  //Sanitize and validate group code
  // body("code").custom(async (value) => {
  //   if (!(await isCodeUnique(value))) {
  //     throw new Error("Group code must be unique.");
  //   }
  // }),
];
