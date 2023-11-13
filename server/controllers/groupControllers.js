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

export const addMemberToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { username } = req.body;

    // Find the user by username
    const member = await User.findOne({ username });
    if (!member) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "User not found with the provided username",
      });
    }

    // Check if the user is already a member of the group
    const isMember = await Group.exists({ _id: groupId, members: member._id });
    if (isMember) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "User is already a member of the group",
      });
    }

    // Update the group by adding the user to the members array
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        $push: {
          members: member._id,
        },
      },
      // Return the modified document
      { new: true }
    )
      .populate({
        path: "members",
        select: "username firstName lastName",
      })
      .populate("admin", "username firstName lastName");

    if (!updatedGroup) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Group not found with the provided groupId",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "User added to the group successfully",
      updatedGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};
