import statusCodes from "http-status-codes";
import User from "../models/User.js";
import bcrypt from "bcrypt";

/**
 * Handler for create user
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return res
      .status(statusCodes.OK)
      .json({ message: "Successfully created", data: newUser });
  } catch (error) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "User creation failed", details: error.message });
  }
};
