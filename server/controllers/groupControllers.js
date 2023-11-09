import { StatusCodes } from "http-status-codes";
import Group from "../models/Group.js";
import User from "../models/User.js";

/**
 * Handler for creating group using userId
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createGroup = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, description } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found with the provided ID" });
    }

    // Create a new group and associate it with the user
    const newGroup = await Group.create({
      userId,
      name,
      description,
      admin: userId, // Set the admin field to the user's ID
    });

    // Populate the user details for the admin
    await newGroup.populate("admin", "username firstName lastName");

    return res.status(StatusCodes.CREATED).json({
      message: "New group has been created",
      newGroup,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong", details: error.message });
  }
};

export const addGroupMemeber = async (req, res) => {
  try {
    const { groupId, username } = req.params;

    // Find the user by userId
    const user = await User.findById(username);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found with the provided username" });
    }
  } catch (error) {}
};
