import User from "../models/User.js";

/**
 * Helper fpr uppercase the first letter
 * @param {*} word
 * @returns
 */
export const uppercaseFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

/**
 * Helper to check if the user with the provided email exists
 * @param {*} value
 */
export const checkUserExistence = async (value) => {
  const existedUser = await User.findOne({ email: value });

  if (existedUser) {
    throw new Error("A user already exists with this email address");
  }
};
