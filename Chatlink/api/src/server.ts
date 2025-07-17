import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { pool } from "./config/db";
import { initializeTables } from "./models";

const startServer = async (): Promise<void> => {
  try {
    await initializeTables();

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`Server is up and running on PORT: ${port}`);
    });

    process.on("SIGINT", async () => {
      console.log("Shutting down gracefully...");
      await pool.end(); // Closing the DB connection
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("Shutting down gracefully...");
      await pool.end(); // Closing the DB connection
      process.exit(0);
    });
  } catch (error) {
    console.error("Error initializing the server: ", error);
    process.exit(1);
  }
};

startServer();
