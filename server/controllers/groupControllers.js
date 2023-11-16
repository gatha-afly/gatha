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
 * Handler for add group members using the groupId and username
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
    const existingGroup = await Group.findOne({
      _id: groupId,
      members: member._id,
    });
    if (existingGroup) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: `User is already a member of the group '${existingGroup.name}'`,
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};

/**
 * Handler for removing group members using the groupId and adminId
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const removeMemberFromGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { username } = req.body;

    // Find the user to remove by username
    const memberToRemove = await User.findOne({ username });
    if (!memberToRemove) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "User not found with the provided username",
      });
    }

    // Check if the user is already a member of the group
    const existingGroup = await Group.findOne({
      _id: groupId,
      members: memberToRemove._id,
    });
    if (!existingGroup) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: `User is not a member of the group or the group does not exist`,
      });
    }

    // Update the group by removing the user from the members array
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        $pull: {
          members: memberToRemove._id,
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
      message: "User removed from the group successfully",
      updatedGroup,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};

/**
 * Handler for displaying all group members using groupId
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate({
        path: "members",
        select: "username firstName lastName",
      })
      .populate("admin", "username firstName lastName");

    if (!group) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Group not found" });
    }

    const { members, name, admin } = group;

    const groupAdmin = {
      username: admin.username,
      firstName: admin.firstName,
      lastName: admin.lastName,
    };

    return res
      .status(StatusCodes.OK)
      .json({ groupId, groupName: name, groupAdmin, groupMembers: members });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

/**
 * Handler for getting all the groups
 * @param {*} req
 * @param {*} res
 */
export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find({});

    if (!groups || groups.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "There are no groups" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "List of all groups", groups });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

/**
 * Handler for deleting groups using groupId
 * @param {*} req
 * @param {*} res
 */
export const deleteGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "The group not found with provided ID" });
    }
    return res.status(StatusCodes.OK).json({
      message: "The group has been successfully deleted",
      deletedGroup,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

/**
 * Handler for joining a group with provided group code
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const joinGroup = async (req, res) => {
  try {
    const { userId } = req.params;
    const { code } = req.body;

    // Check if the provided userId is not already a member of the group
    const existingGroup = await Group.findOne({ code, members: userId });

    if (existingGroup) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "You are already a member of the group with the provided code",
      });
    }

    // Update the group by adding the user to the members array
    const updatedGroup = await Group.findOneAndUpdate(
      { code },
      {
        $addToSet: {
          members: userId,
        },
      },
      { new: true }
    )
      .populate({
        path: "members",
        select: "username firstName lastName",
      })
      .populate("admin", "username firstName lastName");

    if (!updatedGroup) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Group not found with the provided code",
      });
    }

    res.status(StatusCodes.OK).json({
      message: "You have been added to the group successfully",
      updatedGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};

/**
 * Leave a group
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const leaveGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    // Check if a user with the provided ID exists in the database
    const member = await User.findById(userId);
    if (!member) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "The user was not found" });
    }

    // Check if the user is already a member of the group
    const existingGroup = await Group.findOne({
      _id: groupId,
      members: member,
    });
    if (!existingGroup) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: `User is not a member of the group or the group does not exist`,
      });
    }

    // Update the group by removing the user from the members array
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        $pull: {
          members: userId,
        },
      },
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
      message: "You have left the group successfully",
      updatedGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error",
    });
  }
};
