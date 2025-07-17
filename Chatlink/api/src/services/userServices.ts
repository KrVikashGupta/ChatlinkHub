import {
  allUsers,
  getUserDetails,
  getUserDetailsById,
  updateProfilePicture,
  updateUserDetailsById,
  updateUserPasswordByEmail,
  userNameExist,
} from "../models/userModel";
import { PublicUser } from "../types/user";
import CustomError from "../utils/customError";
import bcrypt from "bcrypt";

export const updateUserProfilePicture = async (
  id: string,
  profilePictureURL: string,
): Promise<void> => {
  const user = await getUserDetailsById(id);
  if (!user) {
    throw new CustomError("User not found", 400);
  }

  await updateProfilePicture(id, profilePictureURL);
};

export const updateUser = async (
  id: string,
  username: string | undefined,
  statusMessage: string | undefined,
): Promise<void> => {
  const user = await getUserDetailsById(id);
  if (!user) {
    throw new CustomError("User not found", 400);
  }

  const toUpdate = {
    username,
    statusMessage,
  };

  await updateUserDetailsById(id, toUpdate);
};

export const checkUsernameExist = async (
  username: string,
): Promise<boolean> => {
  return await userNameExist(username);
};

export const getUsers = async (id: string): Promise<PublicUser[]> => {
  return await allUsers(id);
};

export const updatePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  // check if user exist
  const userDetails = await getUserDetails(email);

  if (!userDetails.email) {
    throw new CustomError("No user found with this email", 400);
  }

  // compare the password
  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    userDetails.password,
  );

  if (!isPasswordCorrect) {
    throw new CustomError("Incorrect current Password", 401);
  }

  // password hashing
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await updateUserPasswordByEmail(email, hashedPassword);
};
