import { StatusCodes } from "http-status-codes";

/**
 * Handler to check the health of the website
 * @param {*} req
 * @param {*} res
 */
export const checkHealth = (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "success",
    data: null,
    message: "Health check successful",
  });
};
