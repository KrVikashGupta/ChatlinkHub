import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/customError";
import { getUserDetailsById } from "../models/userModel";
import { ApiResponse } from "../types/apiResponse";

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<ApiResponse> | void> => {
  try {
    const accessToken: string | undefined = req.cookies?.accessToken;

    if (!accessToken) {
      const response: ApiResponse = {
        success: false,
        message: "Unauthorized request, no access token provided",
      };

      return res.status(401).json(response);
    }

    // verify the token
    let decodedToken: JwtPayload;

    try {
      decodedToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
      ) as JwtPayload;
    } catch (error) {
      console.log("Access token verification failed ", error);
      throw new CustomError("Invalid or expired access token", 401);
    }

    const userDetails = await getUserDetailsById(decodedToken.user_id);

    if (!userDetails) {
      console.error("No user found for the provided token ID");
      throw new CustomError("User not found", 404);
    }

    req.user = userDetails;
    next();
  } catch (error) {
    console.log("Error verifying accessToken: ", error);
    throw new CustomError("Error verifying accessToken", 500);
  }
};
