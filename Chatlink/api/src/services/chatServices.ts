import { chatsBetweenTwoUsers } from "../models/messageModel";
import { chatHistory } from "../models/userModel";
import { LatestChat } from "../types/chat";

export const getChatHistory = async (
  userId: string,
): Promise<Array<LatestChat>> => {
  const history = await chatHistory(userId);
  return history;
};

export const getChatsOfTwoUsers = async (
  userId1: string,
  userId2: string,
): Promise<any> => {
  const chats = await chatsBetweenTwoUsers(userId1, userId2);
  return chats;
};
