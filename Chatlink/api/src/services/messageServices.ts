import { getMessagesBetweenUsers, insertMessage } from "../models/messageModel";
import { insertMessageReceipt } from "../models/messageReceiptsModel";
import { Message } from "../types/message";

export const messageInsertion = async (
  senderId: string,
  receiverId: string,
  messageText: string,
): Promise<Message> => {
  const message = await insertMessage(senderId, receiverId, messageText);

  const { id, receiver_id, sent_at, is_deleted }: Message = message;
  await insertMessageReceipt(id, receiver_id, sent_at, is_deleted || false);
  return message;
};

export const messagesBetweenUsers = async (
  senderId: string,
  receiverId: string,
): Promise<Array<Message>> => {
  const messages = await getMessagesBetweenUsers(senderId, receiverId);
  return messages;
};
