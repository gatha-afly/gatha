import Group from "../models/Group.js";
import { logDevError } from "./developmentEnvironmentHelper.js";

/**
 * Handler to check if a group name with provided group name already exists
 * @param {*} value
 */
export const checkGroupExistence = async (value) => {
  const existedGroup = await Group.findOne({ name: value });

  if (existedGroup) {
    throw new Error("A a group exists with this group name");
  }
};

/** Checks if code is unique in database
 *
 * @param {string} code - The code to be checked for uniqueness.
 * @returns {Promise<boolean>} - Returns true if code is unique, false if it already exists.
 * @throws {Error} - Throws an error if there's an issue with the database or the uniqueness check.
 */
export const isCodeUnique = async (code) => {
  try {
    const existingCode = await Group.findOne({ code: code });
    return !existingCode;
  } catch (error) {
    logDevError("Error checking code uniqueness:", error);
    throw new Error(
      "An error occurred while checking code uniqueness. Please try again later."
    );
  }
};
