import { StatusCodes } from "http-status-codes";
import Chat from "../models/Chat.js";

/**
 * Handler for creating chat
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;

    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    // If there is previous chat return that chat
    if (chat) {
      return res.status(StatusCodes.OK).json(chat);
    }

    // If there is no previous chat
    const newChat = new Chat({
      members: [firstId, secondId],
    });

    const response = await newChat.save();

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server error", error });
  }
};

/**
 * Handler for finding user chats
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const findUserChat = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.findOne({
      members: { $in: [userId] },
    });

    return res.status(StatusCodes.OK).json(chats);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server error", error });
  }
};

/**
 * Handler for finding chat
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;

    const chat = await Chat.find({
      members: { $all: [firstId, secondId] },
    });

    return res.status(StatusCodes.OK).json(chat);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server error", error });
  }
};
