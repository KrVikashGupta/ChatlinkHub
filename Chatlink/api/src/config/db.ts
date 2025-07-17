import { Pool } from "pg";


export const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  ssl: {
    rejectUnauthorized: false,
  },
});

// function to query the db
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
