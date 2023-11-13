import { StatusCodes } from "http-status-codes";
import Group from "../models/Group.js";

/**
 * Middleware to check if a user is an admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const isGroupAdminMiddleware = async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;

    // Find the group by groupId
    const group = await Group.findById(groupId);
    if (!group) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Group not found with the provided ID" });
    }

    // Check if the user is the admin of the group
    if (userId !== group.admin.toString()) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to perform this action" });
    }

    // If the user is the admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};
