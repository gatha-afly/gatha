import { StatusCodes } from "http-status-codes";
import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { authorId } = req.params;

    const newMessage = await Message.create({
      authorId,
      message,
    });

    return res.status(StatusCodes.CREATED).json({ message: newMessage });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong", details: error.message });
  }
};
