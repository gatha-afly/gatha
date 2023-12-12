import { StatusCodes } from "http-status-codes";
import { verifyJwt } from "../../helpers/jwt.js";

/**
 * Handler for user authorization
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authorizeUser = (req, res, next) => {
  // Handle if the token isn't there
  if (!req.cookies.userToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No security token" });
  }

  // Verify if token is valid
  try {
    const isValid = verifyJwt(req.cookies.userToken);
    // console.log("isValid token", isValid);

    if (isValid) {
      // If the token is valid, proceed to the next middleware or route
      next();
    } else {
      // If the token is invalid, return an unauthorized response
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid security token" });
    }
  } catch (error) {
    // Handle errors during token verification
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Security token issue" });
  }
};
