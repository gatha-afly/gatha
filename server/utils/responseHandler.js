import Group from "../models/Group.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import Message from "../models/Message.js";
import { StatusCodes } from "http-status-codes";

/**
 * Utility helper to find user by user ID
 * @param {*} userId
 * @returns
 */
export const findUserById = async (userId) => User.findById(userId);

/**
 * Utility helper to find user by username
 * @param {*} username
 * @returns
 */
export const findUserByUsername = async (username) =>
  User.findOne({ username });

/**
 * Utility helper to find user by username
 * @param {*} groupId
 * @returns
 */
export const findGroupById = async (groupId) => Group.findById(groupId);

/**
 * Utility helper to find if a user if already a member of a group
 * @param {*} groupId
 * @param {*} userId
 * @returns
 */
export const isUserAlreadyMember = async (groupId, userId) => {
  // Find the group by ID and check if the user is a member
  const existingGroup = await Group.findOne({
    _id: groupId,
    members: userId,
  });

  return existingGroup !== null;
};

/**
 * Utility helper to update the group
 * @param {*} groupId
 * @param {*} memberId
 * @param {*} operation
 * @returns
 */
export const updateGroupMembers = async (groupId, memberId, operation) => {
  try {
    return await Group.findByIdAndUpdate(
      groupId,
      { [operation]: { members: memberId } },
      { new: true }
    )
      .populate({ path: "members", select: "username firstName lastName" })
      .populate("admins", "username firstName lastName");
  } catch (error) {
    throw new Error(
      "An error occurred while updating group members. Please try again later."
    );
  }
};

/**
 * Utility helper to update the group admin
 * @param {*} groupId
 * @param {*} newAdminId
 * @returns
 */
export const updateGroupAdmin = async (groupId, newAdminId, operation) => {
  try {
    return await Group.findByIdAndUpdate(
      groupId,
      { [operation]: { admins: newAdminId } },
      { new: true }
    )
      .populate("members", "username firstName lastName")
      .populate("admins", "username firstName lastName");
  } catch (error) {
    throw new Error(
      "An error occurred while updating the group admins. Please try again later."
    );
  }
};

/**
 * Utility helper to update the user groups
 * @param {*} groupId
 * @param {*} userId
 * @param {*} operation
 * @returns
 */
export const updateUserGroups = async (groupId, userId, operation) => {
  try {
    return await User.findByIdAndUpdate(
      userId,
      { [operation]: { groups: groupId } },
      { new: true }
      // When the user object is returned it should exclude the password
    )
      .select("-password")
      .populate({
        path: "groups",
        select: "groupId name",
      });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Utility handler for saving messages in group collection
 * @param {*} groupId
 * @param {*} message
 * @returns
 */
export const saveGroupMessage = async (groupId, newMember) => {
  try {
    const updatedGroup = await Group.findOneAndUpdate(
      { _id: groupId },
      {
        $push: {
          messages: newMember,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedGroup) {
      console.error(`Group not found with ID: ${groupId}`);
      return null;
    }

    return updatedGroup;
  } catch (error) {
    console.error("Error saving group message:", error);
    return null;
  }
};

/**
 * Utility handler for checking if a senderId is the sender of the message
 * @param {*} messageId
 * @param {*} senderId
 * @returns
 */
export const IsSenderOfMessage = async (messageId, senderId, res) => {
  // Validate senderId to ensure it is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(senderId)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Invalid senderId",
    });
  }

  return await Message.findOne({
    _id: messageId,
    sender: senderId,
  });
};

/**
 * Utility Handler to check if a user has admin right or not
 * @param {*} groupId
 * @param {*} userId
 * @param {*} res
 * @returns
 */
export const checkAdminAuthorization = async (groupId, userId, res) => {
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "The group is not found" });
    }

    if (!group.admins.includes(userId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You don't have the admin authorization to remove a member",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred while checking admin authorization",
    });
  }
};
