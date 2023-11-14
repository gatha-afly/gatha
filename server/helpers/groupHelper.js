import Group from "../models/Group.js";

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
