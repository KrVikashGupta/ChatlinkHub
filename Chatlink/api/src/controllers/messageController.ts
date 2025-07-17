import { Request, Response, NextFunction } from "express";
import {
  messageQuerySchema,
  sendMessageSchema,
} from "../validators/messageValidators";
import { ApiResponse } from "../types/apiResponse";
import {
  messageInsertion,
  messagesBetweenUsers,
} from "../services/messageServices";
import { Message } from "../types/message";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  try {
    // zod validation
    const result = sendMessageSchema.safeParse(req.body);

    if (!result.success) {
      const response: ApiResponse = {
        success: false,
        message: "Validation failed",
        data: result.error.errors,
      };

      return res.status(400).json(response);
    }

    const { receiverId, messageText } = result.data;

    const senderId = req.user?.id;

    if (!senderId) {
      const response: ApiResponse = {
        success: false,
        message: "Unautherized request",
      };

      return res.status(400).json(response);
    }
    const newMessage: Message = await messageInsertion(
      senderId,
      receiverId,
      messageText,
    );

    const response: ApiResponse = {
      success: true,
      data: newMessage,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    next(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  try {
    // zod validation
    const result = messageQuerySchema.safeParse(req.query);

    if (!result.success) {
      const response: ApiResponse = {
        success: false,
        message: "Validation failed",
        data: result.error.errors,
      };

      return res.status(400).json(response);
    }

    const { senderId, receiverId } = result.data;
    const messages = await messagesBetweenUsers(senderId, receiverId);

    const response: ApiResponse = {
      success: true,
      data: messages,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log("Error in getMessages: ", error);
    next(error);
  }
};
