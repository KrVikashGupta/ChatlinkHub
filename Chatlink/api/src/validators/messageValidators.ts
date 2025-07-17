import z from "zod";

export const sendMessageSchema = z.object({
  receiverId: z.string(),
  messageText: z.string().trim(),
});

export const messageQuerySchema = z.object({
  senderId: z.string(),
  receiverId: z.string(),
});
