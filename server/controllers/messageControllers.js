import { StatusCodes } from "http-status-codes";
import Message from "../models/Message.js";
import { io } from "../socket.io.js";

/**
 * Handler for creating new messages
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, message } = req.body;

    const newMessage = await Message.create({
      chatId,
      senderId,
      message,
    });

    //Emit the new messge to all conntected clients in the same chat room
    io.emit(`chat: ${chatId}`, newMessage);

    return res.status(StatusCodes.CREATED).json({ message: newMessage });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong", details: error.message });
  }
};

/**
 * Handler for getting messages using chatId
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId });

    return res.status(StatusCodes.OK).json(messages);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong", details: error.message });
  }
};
