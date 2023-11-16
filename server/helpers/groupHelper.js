import { StatusCodes } from "http-status-codes";
import Group from "../models/Group.js";
import User from "../models/User.js";
import { logDevError } from "./developmentEnvironmentHelper.js";

/**
 * Find a user by username from the database.
 * @param {string} username - The username to search for.
 * @returns {Promise<Object|null>} - The user object or null if not found.
 */
export const findUserByUsername = async (username) =>
  User.findOne({ username });

/**
 * Find a user by userId from the database.
 * @param {string} userId - The user ID to search for.
 * @returns {Promise<Object|null>} - The user object or null if not found.
 */
export const findUserById = async (userId) => User.findById(userId);

/**
 * Handle the case when a user is not found in the database.
 * @param {Object} res - The response object.
 * @param {string} message - Additional message for the error.
 */
export const handleUserNotFound = (res, message) => {
  res.status(StatusCodes.NOT_FOUND).json({
    error: `User not found with provided ${message}`,
  });
};

/**
 * Handle the case when a group is not found in the database.
 * @param {Object} res - The response object.
 */
export const handleGroupNotFound = (res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    error: "Group not found with the provided groupId",
  });
};

/**
 * Handle internal server errors.
 * @param {Object} res - The response object.
 */
export const handleInternalError = (res) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
  });
};

/**
 * Handle the case when a user is already a member of a group.
 * @param {Object} res - The response object.
 * @param {string} groupName - The name of the group.
 */
export const handleUserAlreadyGroupMember = (res, groupName) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    error: `User is already a member of the group '${groupName}'`,
  });
};

/**
 * Handle the case when a user is not a member of a group.
 * @param {Object} res - The response object.
 * @param {string} groupName - The name of the group.
 */
export const handleUserNotGroupMember = (res, groupName) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    error: `User is not a member of the group '${groupName}'`,
  });
};

/**
 * Update group members in the database.
 * @param {string} groupId - The ID of the group.
 * @param {string} memberId - The ID of the member to add or remove.
 * @param {string} operation - The operation to perform ('$push' or '$pull').
 * @returns {Promise<Object|null>} - The updated group object.
 */
export const updateGroupMembers = async (groupId, memberId, operation) => {
  try {
    return await Group.findByIdAndUpdate(
      groupId,
      { [operation]: { members: memberId } },
      { new: true }
    )
      .populate({ path: "members", select: "username firstName lastName" })
      .populate("admin", "username firstName lastName");
  } catch (error) {
    logDevError("Error updating group members:", error);
    throw new Error(
      "An error occurred while updating group members. Please try again later."
    );
  }
};

/**
 * Check if a group code is unique in the database.
 * @param {string} code - The group code to check.
 * @returns {Promise<boolean>} - True if the code is unique, false otherwise.
 */
export const isCodeUnique = async (code) => {
  try {
    const existingGroup = await Group.findOne({ code });
    return !existingGroup;
  } catch (error) {
    logDevError("Error checking code uniqueness:", error);
    throw new Error(
      "An error occurred while checking code uniqueness. Please try again later."
    );
  }
};
