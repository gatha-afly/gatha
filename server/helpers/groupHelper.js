import { StatusCodes } from "http-status-codes";
import Group from "../models/Group.js";
import User from "../models/User.js";
import { logDevError } from "./developmentEnvironmentHelper.js";

/**
 * Helper to find user by username from database
 * @param {*} username
 * @returns
 */
export const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

/**
 * Helper to find user by userId from database
 * @param {*} userId
 * @returns
 */
export const findUserById = async (userId) => {
  return await User.findById(userId);
};

/**
 * Helper for throwing an error if the user not found in database
 * @param {*} res
 * @returns
 */
export const handleUserNotFound = (res, message) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    error: `User not found with provided ${message}`,
  });
};

/**
 * Helper for handling group not found error
 * @param {*} res
 * @returns
 */
export const handleGroupNotFound = (res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    error: "Group not found with the provided groupId",
  });
};

/**
 * Helper for handling internal errors
 * @param {*} res
 * @returns
 */
export const handleInternalError = (res) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
  });
};

/**
 * Helper for throwing an error if user already a member of a group
 * @param {*} res
 * @param {*} groupName
 * @returns
 */
export const handleUserAlreadyGroupMember = (res, groupName) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: `User is already a member of the group '${groupName}'`,
  });
};

/**
 * Helper for throwing an error if a user is not a member of a group
 * @param {*} res
 * @param {*} groupName
 * @returns
 */
export const handleUserNotGroupMember = (res, groupName) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: `User is not a member of the group '${groupName}'`,
  });
};

/**
 * Helper for updating group memebers
 * @param {*} groupId
 * @param {*} memberId
 * @param {*} operation
 * @returns
 */
export const updateGroupMembers = async (groupId, memberId, operation) => {
  return await Group.findByIdAndUpdate(
    groupId,
    {
      [operation]: {
        members: memberId,
      },
    },
    { new: true }
  )
    .populate({
      path: "members",
      select: "username firstName lastName",
    })
    .populate("admin", "username firstName lastName");
};

/**
 * Halper to check if the group code is unique
 * @param {*} code
 * @returns
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
