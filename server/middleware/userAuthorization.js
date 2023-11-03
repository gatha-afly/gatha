import { StatusCodes } from "http-status-codes";
import { verifyJwt } from "../helpers/jwt.js";

/**
 * Handler for user authorization
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authorizeUser = (req, res, next) => {
  //Handle if the token isn't there

  if (!req.cookies.userToken) {
    //Does the jwt token cookie exists?

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "UNAUTHORIZED ACCESS" }); //It doesn't exist
  }

  //Verify if token is valid
  try {
    const isValid = verifyJwt(req.cookies.userToken);
    console.log("isValid token", isValid);
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "UNAUTHORIZED ACCESS" });
  }

  next();
};
