import { z } from "zod";

export const chatsBetweenTwoUsersSchema = z.object({
  userId1: z.string(),
  userId2: z.string(),
});
