import Group from "../models/Group.js";
import { logDevError } from "./developmentEnvironmentHelper.js";

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
