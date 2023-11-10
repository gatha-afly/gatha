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

/**
 * Handler for add group members using the groupid and username
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const addGroupMember = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { username } = req.body;

    // Find the group by groupId and populate members and admin
    const group = await Group.findById(groupId)
      .populate("members", "username firstName lastName")
      .populate("admin", "username firstName lastName");

    if (!group) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Group not found with the provided groupId" });
    }

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found with the provided username" });
    }

    // Check if the user is already a member of the group
    if (group.members.some((member) => member.username === username)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "User is already a member of the group" });
    }

    // Add the user to the group's members array
    group.members.push(user);
    await group.save();

    if (group) {
      res
        .status(StatusCodes.OK)
        .json({ message: "User added to the group successfully", group });
    } else {
      // Handle the case where `group` is undefined
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal server error" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
