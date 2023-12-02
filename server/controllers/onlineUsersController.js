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

    const onlineUser = await OnlineUsers.findOne({ userId });

    if (!onlineUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ status: "offline" });
    }

    return res.status(StatusCodes.OK).json({ status: "online" });
  } catch (error) {
    console.error("Error in getOnlineUser:", error);
    return errorHandlerUtils.handleInternalError(res);
  }
};
