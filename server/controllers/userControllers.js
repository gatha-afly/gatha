import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateJwt } from "../helpers/jwt.js";
import * as responseHandlerUtils from "../utils/responseHandler.js";
import * as errorHandlerUtils from "../utils/errorHandler.js";

/**
 * Handler for creating user
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const createUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  //Hash the user's Password
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      username,
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
    return errorHandlerUtils.handleInternalError(res);
  }
};

/**
 * Handler for user login
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const loginUser = async (req, res) => {
  try {
    // Convert the email to lowercase
    const lowerCaseEmail = req.body.email.toLowerCase();

    // Find a user with the provided lowercase email and populate the 'groups' field
    const user = await User.findOne({ email: lowerCaseEmail }).populate({
      path: "groups",
      select: "groupId name",
    });

    // Check if the user doesn't exist
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid credentials.",
      });
    }

    // Check if the deactivate field is present and is deactivated == true
    if (user.deactivate && user.deactivate.isDeactivated) {
      // Set isDeactivated to false in the database
      user.deactivate.isDeactivated = false;

      // Save the update
      await user.save();
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
      // Production environment settings
      if (process.env.NODE_ENV === "production") {
        res.cookie("userToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
      } else {
        // Development environment settings
        res.cookie("userToken", token, {
          httpOnly: true,
          secure: false,
        });
      }

      // Retrieve user groups from the populated 'groups' field
      const userGroups = user.groups || [];

      // Return a successful response
      return res.status(StatusCodes.OK).json({
        message: `Login successful. Welcome, ${user.firstName} ${user.lastName}`,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          userId: user._id,
          groups: userGroups, // Use the populated groups
        },
      });
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.error(error);
    return errorHandlerUtils.handleInternalError(res);
  }
};

/**
 * Handler for uploading user profile
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await responseHandlerUtils.findUserById(userId);
    if (!user) {
      return errorHandlerUtils.handleUserNotFound(res, "user ID");
    }

    const profileImage = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "avatar.imagName": req.file.filename,
          "avatar.imgPath": req.file.path,
          "avatar.imagType": req.file.mimetype,
          "avatar.imgSize": req.file.size,
        },
      },
      { new: true }
    );
    if (!profileImage) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    return res.status(StatusCodes.OK).json({
      message: "Your profile image has been uploaded",
      profileImage,
    });
  } catch (error) {
    console.log(error);
    return errorHandlerUtils.handleInternalError(res);
  }
};

/**
 * Handler for user logout
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: false,
    });
    return res.status(StatusCodes.OK).json({ message: "User logged out!" });
  } catch (error) {
    return errorHandlerUtils.handleInternalError(res);
  }
};

/**
 * Handler for updating users
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateUserData = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate({
      path: "groups",
      select: "groupId name",
    });

    if (!user) {
      return errorHandlerUtils.handleUserNotFound(res, "user ID");
    }

    const userGroups = user.groups || [];

    return res.status(StatusCodes.OK).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        userId: user._id,
        groups: userGroups,
      },
    });
  } catch (error) {
    console.log(error);
    return errorHandlerUtils.handleInternalError(res);
  }
};
