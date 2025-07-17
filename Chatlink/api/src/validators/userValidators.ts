import z from "zod";

export const userUpdateSchema = z
  .object({
    username: z.string().min(3).max(50).trim().optional(),
    statusMessage: z.string().min(1).trim().optional(),
  })
  .refine(
    (data) => data.username !== undefined || data.statusMessage !== undefined,
    {
      message: "At least one field username or status_message must be provided",
    },
  );

export const usernameSchema = z
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
  );

export const userUpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Not a valid password"),
    newPassword: z.string().min(6, "Not a valid password"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "new password and confirm new password must match",
  });
