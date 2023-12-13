import { body } from "express-validator";
import { uppercaseFirstLetter } from "../../helpers/userHelper.js";

export const validateGroupRules = [
  //Sanitize and validate group name
  body("name")
    .trim()
    .customSanitizer((value) => uppercaseFirstLetter(value))
    .isLength({ min: 3, max: 20 })
    .withMessage("Group name must be between 3 and 20 characters long"),

  //Sanitize and validate group description
  body("description")
    .trim()
    .customSanitizer((value) => uppercaseFirstLetter(value))
    .isLength({ max: 100 })
    .withMessage("Group description can't be longer than 100 characters"),
];
