import { StatusCodes } from "http-status-codes";

/**
 * Error handler to check if the user is in database
 * @param {*} res
 * @param {*} message
 */
export const handleUserNotFound = (res, message) => {
  res.status(StatusCodes.NOT_FOUND).json({
    error: `User not found with provided ${message}`,
  });
};

/**
 *  Error handler to check if the group is in database
 * @param {*} res
 */
export const handleGroupNotFound = (res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    error: "Group not found with the provided groupId",
  });
};

/**
 *Error handler for internal server error
 * @param {*} res
 */
export const handleInternalError = (res) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal server error",
  });
};

/**
 * Handler to check if a user is already member of a group
 * @param {*} res
 * @param {*} groupName
 */
export const handleUserAlreadyGroupMember = (res, groupName) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    error: `User is already a member of the group '${groupName}'`,
  });
};

/**
 * Handler to check if a user is not already a member of a group
 * @param {*} res
 * @param {*} groupName
 */
export const handleUserNotGroupMember = (res, groupName) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    error: `User is not a member of the group '${groupName}'`,
  });
};

/**
 * Error handler to check if the previous group code matches
 * @param {*} res
 */
export const handleNoMatchingCode = (res) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    error: `Provided code doesn't match with the existing group code. Please try again.  `,
  });
};
