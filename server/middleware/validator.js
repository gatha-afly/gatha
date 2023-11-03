import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

/**
 * Handler for validating users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const validator = (req, res, next) => {
  //Extract the validation error from the request object
  const errors = validationResult(req);

  //If there are errors
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  next();
};
