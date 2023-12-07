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
        res,
        // Assuming you want to show the username in the error message
        newMember.username
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
    const { groupId } = req.params;
    const { username } = req.body;

    // Check if the provided group ID exists
    const existingGroup = await Group.findById(groupId);
    if (!existingGroup) {
      return errorHandlerUtils.handleGroupNotFound(res, groupId);
    }

    // Check if the provided username exists
    const memberToRemove = await responseHandlerUtils.findUserByUsername(
      username
    );
    if (!memberToRemove) {
      return errorHandlerUtils.handleUserNotFound(res, "username");
    }

    // Check if the user is a member of the group
    const isMember = await responseHandlerUtils.isUserAlreadyMember(
      groupId,
      memberToRemove._id
    );

    if (!isMember) {
      return errorHandlerUtils.handleUserNotGroupMember(
        res,
        // Assuming you want to show the username in the error message
        memberToRemove.username
      );
    }

    // Update the group by removing the user from the members array
    const updatedGroup = await responseHandlerUtils.updateGroupMembers(
      groupId,
      memberToRemove._id,
      "$pull"
    );

    // Update the array of groups in user object
    await responseHandlerUtils.updateUserGroups(
      groupId,
      memberToRemove._id,
      "$pull"
    );
    res.status(StatusCodes.OK).json({
      message: "User removed from the group successfully",
      updatedGroup,
    });
  } catch (error) {
    return errorHandlerUtils.handleInternalError(res);
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
 * Handler for deleting groups using groupId
 * @param {*} req
 * @param {*} res
 */
export const deleteGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return errorHandlerUtils.handleGroupNotFound(res);
    }
    return res.status(StatusCodes.OK).json({
      message: "The group has been successfully deleted",
      deletedGroup,
    });
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

    // Update the group by removing the user from the members array
    const updatedGroup = await responseHandlerUtils.updateGroupMembers(
      groupId,
      userId,
      "$pull"
    );
    // Update the groups array of the user
    const updatedUser = await responseHandlerUtils.updateUserGroups(
      groupId,
      userId,
      "$pull"
    );

    res.status(StatusCodes.OK).json({
      message: "You have left the group successfully",
      updatedGroup,
      updatedUser,
    });
  } catch (error) {
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

    //Find the user by userId
    const user = await responseHandlerUtils.findUserById(userId);
    if (!user) {
      return errorHandlerUtils.handleUserNotFound(res, "user ID");
    }

    //Find the group by groupId
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

    const { _id, username, firstName, lastName } = admins;
    const groupAdmin = { id: _id, username, firstName, lastName };

    //The return response if the user is not admin
    const commonResponse = {
      groupId,
      name,
      description,
      admins: groupAdmin,
      members,
    };

    // Convert both userId and group.admin._id to strings for comparison
    if (String(userId) !== String(group.admins._id)) {
      return res.status(StatusCodes.OK).json(commonResponse);
    }

    //Returns the gorup if the user id admin
    return res.status(StatusCodes.OK).json({
      group_code: code,
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
    const { name, description, admin } = group;

    // Mapping the members of the group to include additional information
    const members = group.members.map((member) => ({
      ...member,

      // checks if a member is the admin or not
      isAdmin: member._id.toString() === admin.toString() ? true : false,
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
    const { groupId, adminId } = req.params;
    const { username } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return errorHandlerUtils.handleGroupNotFound(res);
    }

    const newAdmin = await responseHandlerUtils.findUserByUsername(username);
    if (!newAdmin) {
      return errorHandlerUtils.handleUserNotFound(res, "username");
    }

    if (newAdmin._id.toString() === group.admin.toString()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "The user already has admin rights for this group",
      });
    }

    const updatedGroupAdmin = await updateGroupAdmin(groupId, newAdmin._id);

    return res.status(StatusCodes.OK).json({
      message: "The new user has been added as a group admin",
      updatedGroupAdmin,
    });
  } catch (error) {
    console.error(error);
    return errorHandlerUtils.handleInternalError(res);
  }
};
