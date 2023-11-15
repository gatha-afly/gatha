import Group from "../models/Group.js";
import { logDevError } from "./developmentEnvironmentHelper.js";
import { customAlphabet } from "nanoid";

/**
 * Defines a custom alphabet for code generation, excluding numbers and uppercase letters that are easily confused.
 */
export const nanoid = customAlphabet("ACDEFGHIJKLMNOPQRSTUVWXYZ346789");

/** Checks if code is unique in database
 *
 * @param {string} code - The code to be checked for uniqueness.
 * @returns {Promise<boolean>} - Returns true if code is unique, false if it already exists.
 * @throws {Error} - Throws an error if there's an issue with the database or the uniqueness check.
 */
export const isCodeUnique = async (code) => {
  try {
    const existingCode = await Group.findOne({ code });
    return !existingCode;
  } catch (error) {
    logDevError("Error checking code uniqueness:", error);
    throw new Error(
      "An error occurred while checking code uniqueness. Please try again later."
    );
  }
};
