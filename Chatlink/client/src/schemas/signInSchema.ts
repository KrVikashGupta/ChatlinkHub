import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Not a valid password"),
});
