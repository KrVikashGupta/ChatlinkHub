import http from "http";
import express, { Request, Response } from "express";
import { query } from "./config/db";
import { ApiResponse } from "./types/apiResponse";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initSocket } from "./socket";

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/api/v1", (_: Request, res: Response) => {
  const response: ApiResponse = {
    success: true,
    message: "Hello from chatlink-api",
  };

  return res.status(200).json(response);
});

app.get("/api/v1/test-db", async (_: Request, res: Response) => {
  try {
    const result = await query("SELECT NOW()");

    const response: ApiResponse<{ currentTime: string }> = {
      success: true,
      data: { currentTime: result.rows[0].now },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Database connection failed", error);
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An unknown error occured",
      });
    }
  }
});

app.use("/api/v1", routes);

app.use(errorHandler);

export default server;
