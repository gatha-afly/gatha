import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Group from "../models/Group.js";
import * as responseHandlerUtils from "../utils/responseHandler.js";
import * as errorHandlerUtils from "../utils/errorHandler.js";
import User from "../models/User.js";

/***
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
    const user = await responseHandlerUtils.findUserById(userId);
    if (!user) {
      return errorHandlerUtils.handleUserNotFound(res, "user ID");
    }

    // Create a new group and associate it with the user
    const groupData = {
      userId,
      name,
      admins: userId, // Set userId as group admin
      members: userId,
    };

    // Conditionally set the description field
    if (description) {
      groupData.description = description;
    }

    const newGroup = await Group.create(groupData);

    // Populate the user details for the admin
    await newGroup.populate("admins", "username firstName lastName");

    const updatedUser = await responseHandlerUtils.updateUserGroups(
      newGroup._id,
      userId,
      "$push"
    );
    return res.status(StatusCodes.CREATED).json({
      message: "New group has been created",
      newGroup,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error.CastError) {
      return errorHandlerUtils.handleUserNotFound(res, "user ID");
    }
    return errorHandlerUtils.handleInternalError(res);
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
    const newMember = await responseHandlerUtils.findUserByUsername(username);
    if (!newMember) {
      return errorHandlerUtils.handleUserNotFound(res, "username");
    }

    // Check if the user is already a member of the group
    const userAlreadyMember = await responseHandlerUtils.isUserAlreadyMember(
      groupId,
      newMember._id
    );

    // Throws an error if the user is already a member of a group
    if (userAlreadyMember) {
      return errorHandlerUtils.handleUserAlreadyGroupMember(
        res
        // Assuming you want to show the username in the error message
      );
    }

    // Update the group by adding the user to the members array
    const updatedGroup = await responseHandlerUtils.updateGroupMembers(
      groupId,
      newMember._id,
      "$push"
    );

    // Adding the users to groups array
    await responseHandlerUtils.updateUserGroups(
      groupId,
      newMember._id,
      "$push"
    );

    res.status(StatusCodes.OK).json({
      message: "User added to the group successfully",
      updatedGroup,
    });
  } catch (error) {
    console.error(error);
    return errorHandlerUtils.handleInternalError(res);
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
    const { groupId, adminId, userId } = req.params;

    // Check if the provided group ID exists
    const existingGroup = await Group.findById(groupId);
    if (!existingGroup) {
      return errorHandlerUtils.handleGroupNotFound(res, groupId);
    }

    // Check if the provided userId exists
    const memberToRemove = await responseHandlerUtils.findUserById(userId);
    if (!memberToRemove) {
      return errorHandlerUtils.handleUserNotFound(res, "user ID");
    }

    // Check if the user is a member of the group
    const isMember = existingGroup.members.includes(memberToRemove._id);
    if (!isMember) {
      return errorHandlerUtils.handleUserNotGroupMember(
        res,
        existingGroup.name
      );
    }

    // Checks if the adminId is actually the admin of the group
    if (group.admins.includes(adminId) !== existingGroup.admins.toString()) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You don't have the admin authorization to remove a member",
        code: 407,
      });
    }

    // Update the group by removing the user from the members array
    await Group.findByIdAndUpdate(groupId, {
      $pull: { members: memberToRemove._id },
    });

    // Update the array of groups in the user object
    await responseHandlerUtils.updateUserGroups(
      groupId,
      memberToRemove._id,
      "$pull"
    );

    res.status(StatusCodes.OK).json({
      message: "User removed from the group successfully",
    });
  } catch (error) {
    console.error(error);
    return errorHandlerUtils.handleInternalError(res, error.message);
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

    //Throws an error if there are not groups in database
    if (!groups) {
      return errorHandlerUtils.handleGroupNotFound(res);
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "List of all groups", groups });
  } catch (error) {
    return errorHandlerUtils.handleInternalError(res);
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

    // Find the group based on the provided code to get the groupId
    const group = await Group.findOne({ code });

    if (!group) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "No group found with the provided code",
      });
    }

    // Check if the provided userId is not already a member of the group
    const userAlreadyMember = await responseHandlerUtils.isUserAlreadyMember(
      group._id,
      userId
    );

    if (userAlreadyMember) {
      return errorHandlerUtils.handleUserAlreadyGroupMember(res, group.name);
    }

    // Update the group by adding the user to the members array
    const updatedGroup = await responseHandlerUtils.updateGroupMembers(
      group._id, // Update based on group ID
      userId,
      "$addToSet"
    );

    // Update the groups array of the user
    const updatedUser = await responseHandlerUtils.updateUserGroups(
      group._id,
      userId,
      "$push"
    );

    res.status(StatusCodes.OK).json({
      message: "You have been added to the group successfully",
      currently_joined_group: updatedGroup,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return errorHandlerUtils.handleInternalError(res);
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
    const member = await responseHandlerUtils.findUserById(userId);
    if (!member) {
      return errorHandlerUtils.handleUserNotFound(res, "userId");
    }

    // Check if the provided userId is a member of the group
    const isMember = await responseHandlerUtils.isUserAlreadyMember(
      groupId,
      userId
    );
    if (!isMember) {
      return errorHandlerUtils.handleUserNotGroupMember(res, groupId);
    }

    // Fetch detailed information about the group, including its admins
    const group = await Group.findById(groupId).lean();

    // Check if the user is an admin
    const isAdmin = group.admins.some(
      (adminId) => group.admins.includes(adminId) === userId
    );

    if (isAdmin) {
      // Check if the user is the only admin and not the only group member
      if (group.admins.length === 1 && group.members.length > 1) {
        return res.status(StatusCodes.FORBIDDEN).json({
          error:
            "You are the only admin in the group. Assign someone as admin before leaving.",
          code: 405,
        });
      }

      // Update the group by removing the user from admins array
      await responseHandlerUtils.updateGroupAdmin(groupId, userId, "$pull");

      // Update the groups array of the user
      await responseHandlerUtils.updateUserGroups(groupId, userId, "$pull");

      // update the group by removing the user from the members array
      await responseHandlerUtils.updateGroupMembers(groupId, userId, "$pull");

      return res.status(StatusCodes.OK).json({
        message: "You have left the group successfully",
      });
    } else {
      // If the user is not an admin, update the group by removing the user from the members array
      await responseHandlerUtils.updateGroupMembers(groupId, userId, "$pull");

      // Update the groups array of the user
      await responseHandlerUtils.updateUserGroups(groupId, userId, "$pull");

      return res.status(StatusCodes.OK).json({
        message: "You have left the group successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    return errorHandlerUtils.handleInternalError(res);
  }
};
/**
 *Handler for getting group details
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getGroupData = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    // Find the user by userId
    const user = await responseHandlerUtils.findUserById(userId);
    if (!user) {
      return errorHandlerUtils.handleUserNotFound(res, "user ID");
    }

    // Find the group by groupId
    const group = await Group.findById(groupId)
      .populate({
        path: "members",
        select: "username firstName lastName",
      })
      .populate("admins", "username firstName lastName");

    if (!group) {
      return errorHandlerUtils.handleGroupNotFound(res);
    }

    const { members, name, description, admins, code } = group;

    // Map admins to the required format
    const groupAdmins = admins.map((admin) => {
      const { _id, username, firstName, lastName } = admin;
      return { id: _id, username, firstName, lastName };
    });

    // The return response if the user is not admin
    const commonResponse = {
      groupId,
      name,
      description,
      admins: groupAdmins,
      members,
    };

    // Convert both userId and group.admins._id to strings for comparison
    if (!admins.some((admin) => String(userId) === String(admin._id))) {
      return res.status(StatusCodes.OK).json(commonResponse);
    }

    // Returns the group if the user is an admin
    return res.status(StatusCodes.OK).json({
      code: code,
      ...commonResponse,
    });
  } catch (error) {
    console.error(error);
    return errorHandlerUtils.handleInternalError(res, error.message);
  }
};

/**
 * Handler for getting Group members by groupId and userId
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const getGroupMembers = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    // Checking if the user is a member of the specified group
    const isMember = await Group.findOne({
      _id: groupId,
      members: userId,
    }).lean();

    if (!isMember) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "You are not a member of this group" });
    }

    // Fetching detailed information about the group, including its members
    const group = await Group.findById(groupId)
      .populate({
        path: "members",
        select: "username firstName lastName",
      })
      .lean();

    // If the specified group is not found, handle the error
    if (!group) {
      return errorHandlerUtils.handleGroupNotFound(res);
    }

    // Extracting relevant details from the group object
    const { name, description, admins } = group;

    // Mapping the members of the group to include additional information
    const members = group.members.map((member) => ({
      ...member,

      // checks if a member is an admin and returns true if it is otherwise returns false
      isAdmin: admins.some(
        (adminId) => group.admins.includes(adminId) === member._id.toString()
      ),
    }));

    return res.status(StatusCodes.OK).json({
      groupId,
      name,
      description,
      members,
    });
  } catch (error) {
    return errorHandlerUtils.handleInternalError(res);
  }
};

/**
 * Handler for assigning user as admin of the group
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const assignUserAsAdmin = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const { username } = req.body;

    //Checks if the provided group id available in database
    const group = await Group.findById(groupId);
    if (!group) {
      return errorHandlerUtils.handleGroupNotFound(res);
    }

    //Checks if the provided username exists
    const newAdmin = await responseHandlerUtils.findUserByUsername(username);
    if (!newAdmin) {
      return errorHandlerUtils.handleUserNotFound(res, "username");
    }

    const isMember = await responseHandlerUtils.isUserAlreadyMember(
      groupId,
      newAdmin._id
    );

    //checks if the user is a member of the selected group
    if (!isMember) {
      return errorHandlerUtils.handleUserNotGroupMember(res, group.name);
    }

    //Check if the user is already an admin in the group
    if (newAdmin._id.toString() === group.admins.includes(newAdmin._id) ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "The user is already an admin for this group",
        code: 406,
      });
    }
    //Check if the assigning member is an admin 
    if (userId !== group.admins.includes(userId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You are not authorized to assign a new admin for this group",
        code: 407,
      });
    }
    await responseHandlerUtils.updateGroupAdmin(groupId, newAdmin._id, "$push");

    return res.status(StatusCodes.OK).json({
      message: "The new user has been added as a group admin",
    });
  } catch (error) {
    console.error(error);
    return errorHandlerUtils.handleInternalError(res);
  }
};
