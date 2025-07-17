import { z } from "zod";

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3).max(50).trim(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
