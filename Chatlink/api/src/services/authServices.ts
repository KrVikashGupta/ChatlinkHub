import bcrypt from "bcrypt";
import {
  createUser,
  emailExist,
  userNameExist,
  getUserDetails,
  getUserDetailsById,
} from "../models/userModel";
import CustomError from "../utils/customError";
import { Tokens, User } from "../types/user";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateAccessToken = (user_id: string): string => {
  const accessToken = jwt.sign(
    { user_id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string,
    },
  );
  return accessToken;
};

export const generateRefreshToken = (user_id: string): string => {
  const refreshToken = jwt.sign(
    { user_id },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string,
    },
  );
  return refreshToken;
};

export const registerUser = async (
  email: string,
  password: string,
  username: string,
): Promise<User> => {
  // check if email already exist
  const userExist = await emailExist(email);

  if (userExist) {
    throw new CustomError("Email already exists", 400);
  }

  // check if username already exist
  const usernameExist = await userNameExist(username);

  if (!usernameExist) {
    throw new CustomError("Username already exists", 400);
  }

  // password hashing
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await createUser(email, hashedPassword, username);

  return user;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{
  tokens: Tokens;
  user: Omit<User, "password">;
}> => {
  const userDetails: User = await getUserDetails(email);

  // check if user exist
  const userExist = await emailExist(email);

  if (!userExist) {
    throw new CustomError("First register your email.", 400);
  }

  // compare the password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    userDetails.password,
  );

  if (!isPasswordCorrect) {
    throw new CustomError("Incorrect Email or Password", 401);
  }

  const {
    password: userPassword,
    created_at,
    updated_at,
    ...userWithoutSensitiveData
  } = userDetails;

  const accessToken = generateAccessToken(userDetails.id);
  const refreshToken = generateRefreshToken(userDetails.id);

  const tokens: Tokens = {
    accessToken,
    refreshToken,
  };

  return { tokens, user: userWithoutSensitiveData };
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<Tokens> => {
  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
  ) as JwtPayload;
  if (!decodedToken) {
    throw new CustomError("Invalid refresh token", 401);
  }

  const userDetails = await getUserDetailsById(decodedToken.user_id);

  if (!userDetails) {
    console.log("Test");
    throw new CustomError("User not found", 404);
  }

  // generate new tokens
  const newAccessToken = generateAccessToken(userDetails.id) as string;
  const newRefreshToken = generateRefreshToken(userDetails.id);

  const tokens: Tokens = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };

  return tokens;
};
