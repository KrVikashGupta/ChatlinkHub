import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username must be less than 20 characters" })
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username should only contain alphanumeric characters and underscores",
      )
      .regex(
        /^(?!_)[a-zA-Z0-9_]+(?<!_)$/,
        "Username should not start or end with an underscore",
      ),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
