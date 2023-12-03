import { StatusCodes } from "http-status-codes";
import OnlineUsers from "../models/OnlineUsers.js";
import * as errorHandlerUtils from "../utils/errorHandler.js";

/**
 * Handler for getting online users
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const getOnlineUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the online user based on userId
    const onlineUser = await OnlineUsers.findOne({ userId });

    if (!onlineUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ status: "offline" });
    }

    // Return the online user object containing socketId
    return res.status(StatusCodes.OK).json({
      status: "online",
      userId: onlineUser.userId,
      socketId: onlineUser.socketId,
    });
  } catch (error) {
    // Handle other internal errors using the utility function
    return errorHandlerUtils.handleInternalError(res);
  }
};
