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
  // Extract the validation error from the request object
  const errors = validationResult(req);

  // If there are errors
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      type: "field",
      value: req.body[error.param], // This line is updated
      msg: error.msg,
      path: error.param,
      location: "body",
    }));

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: formattedErrors });
  }

  next();
};
