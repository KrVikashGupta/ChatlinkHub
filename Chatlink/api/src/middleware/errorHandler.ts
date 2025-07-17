import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/apiResponse";
import CustomError from "../utils/customError";

const errorHandler = (
  err: Error & { status?: number }, // extend error type to include status
  req: Request,
  res: Response,
  next: NextFunction,
): Response<ApiResponse> | void => {
  console.error(err);

  const response: ApiResponse = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  // handle custom errors differently
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(response);
  }

  res.status(err.status || 500).json(response);
};

export default errorHandler;
