import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateJwt } from "../helpers/jwt.js";

/**
 * Handler for creating user
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //Hash the user's Password
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Returns a bad request response if user don't provide the required data
    if (!newUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "You need to provide the required information to sign up!",
      });
    }

    //Returns a success response with newly created user
    return res
      .status(StatusCodes.OK)
      .json({ message: "User successfully created", data: newUser });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong", details: error.message });
  }
};

/**
 * Handler for deleting user
 * @param {*} req
 * @param {*} res
 */
export const deleteUser = async (req, res) => {
  try {
  } catch (error) {}
};

/**
 * Handler for user login
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const loginUser = async (req, res) => {
  try {
    // Find a user with the provided email
    const user = await User.findOne({ email: req.body.email });

    // Check if the user doesn't exist
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "User not found. Please register an account.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const matchedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Check if the password matches
    if (matchedPassword) {
      // Generates a JWT token for the user
      const token = generateJwt(user._id);

      // Set the token as an HTTP-only cookie
      res.cookie("userToken", token, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
      });

      // Return a successful response
      return res
        .status(StatusCodes.OK)
        .json({ message: "Login successful. Welcome, ", user: user });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Incorrect email or password. Please try again!" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong", details: error.message });
  }
};

/**
 * Handler for user logout
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const logoutUser = async (req, res) => {
  res.clearCookie("userToken", {
    httpOnly: true,
    secure: false,
  });
  return res.status(StatusCodes.OK).json({ message: "User logged out!" });
};
