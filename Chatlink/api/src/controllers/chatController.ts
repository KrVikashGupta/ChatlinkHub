import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/apiResponse";
import { getChatHistory, getChatsOfTwoUsers } from "../services/chatServices";
import { chatsBetweenTwoUsersSchema } from "../validators/chatValidators";

export const getUserchats = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      const response: ApiResponse = {
        success: false,
        message: "Unautherized request",
      };

      return res.status(400).json(response);
    }

    const history = await getChatHistory(userId);

    const response: ApiResponse = {
      success: true,
      data: {
        chatHistory: history,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log("Error getting user chats: ", error);
    next(error);
  }
};

export const getChatsBetweenTwousers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // zod validation
    const result = chatsBetweenTwoUsersSchema.safeParse(req.query);

    if (!result.success) {
      const response: ApiResponse = {
        success: false,
        message: "Validation failed",
        data: result.error.errors,
      };

      return res.status(400).json(response);
    }

    const { userId1, userId2 } = result.data;

    const chats = await getChatsOfTwoUsers(userId1, userId2);

    const response: ApiResponse = {
      success: true,
      data: {
        chats: chats,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log("Error getting chats between two users: ", error);
    next(error);
  }
};
