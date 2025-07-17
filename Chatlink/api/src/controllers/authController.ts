import { NextFunction, Request, Response } from "express";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../validators/authValidators";
import { ApiResponse } from "../types/apiResponse";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../services/authServices";
import { Tokens } from "../types/user";

export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  // zod validation
  const result = userRegistrationSchema.safeParse(req.body);

  if (!result.success) {
    const response: ApiResponse = {
      success: false,
      message: "Validation failed",
      data: result.error.errors,
    };

    return res.status(400).json(response);
  }

  const { email, password, username } = result.data;

  try {
    await registerUser(email, password, username);

    const response: ApiResponse = {
      success: true,
      message: "User registered",
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error("Error during user registration: ", error);
    next(error);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  // zod validation
  const result = userLoginSchema.safeParse(req.body);

  if (!result.success) {
    const response: ApiResponse = {
      success: false,
      message: "Validation failed",
      data: result.error.errors,
    };

    return res.status(400).json(response);
  }

  const { email, password } = result.data;

  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as "strict",
    };

    const accessTokenExpiry = 15 * 60 * 1000; // 15 minutes
    const refreshTokenexpiry = 7 * 24 * 60 * 60 * 1000; // 7 days

    const { tokens, user } = await loginUser(email, password);

    //  set cookies
    res.cookie("accessToken", tokens.accessToken, {
      ...cookieOptions,
      maxAge: accessTokenExpiry,
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      ...cookieOptions,
      maxAge: refreshTokenexpiry,
    });

    const response: ApiResponse = {
      success: true,
      message: "User logged In",
      data: {
        user,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error during user login: ", error);
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  const refreshToken: string | undefined = req.cookies?.refreshToken;

  if (!refreshToken) {
    const response: ApiResponse = {
      success: false,
      message: "Refresh token is missing",
    };
    return res.status(401).json(response);
  }
  try {
    const tokens: Tokens = await refreshAccessToken(refreshToken);

    const accessTokenExpiry = 15 * 60 * 1000; // 15 minutes
    const refreshTokenexpiry = 7 * 24 * 60 * 60 * 1000; // 7 days

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as "strict",
    };

    //  set cookies
    res.cookie("accessToken", tokens.accessToken, {
      ...cookieOptions,
      maxAge: accessTokenExpiry,
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      ...cookieOptions,
      maxAge: refreshTokenexpiry,
    });

    const response: ApiResponse = {
      success: true,
      message: "Access token refreshed",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error while refreshing accessToken: ", error);
    next(error);
  }
};

export const logout = async (
  _: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as "strict",
    };

    res.clearCookie("accessToken", {
      ...cookieOptions,
    });

    res.clearCookie("refreshToken", {
      ...cookieOptions,
    });

    const response: ApiResponse = {
      success: true,
      message: "Logged out successfully",
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error during logout:", error);
    next(error);
  }
};
