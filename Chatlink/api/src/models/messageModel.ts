import { query } from "../config/db";
import CustomError from "../utils/customError";
import { Message } from "../types/message";

// create messages table
export const createMessageTable = async (): Promise<void> => {
  const createMessageTableQuery = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
      receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
      message_text TEXT NOT NULL,
      sent_at TIMESTAMPTZ DEFAULT NOW(),
      is_deleted BOOLEAN DEFAULT FALSE
    );    
  `;
  await query(createMessageTableQuery);
};

export const insertMessage = async (
  senderId: string,
  receiverId: string,
  messageText: string,
): Promise<Message> => {
  try {
    const insertMessageQuery = `
      INSERT INTO messages (sender_id, receiver_id, message_text)
      values ($1, $2, $3) RETURNING *;
    `;

    const result = await query(insertMessageQuery, [
      senderId,
      receiverId,
      messageText,
    ]);

    return result.rows[0];
  } catch (error) {
    console.log("Error inserting message: ", error);
    throw new CustomError("Could not insert message", 500);
  }
};

export const getMessagesBetweenUsers = async (
  senderId: string,
  receiverId: string,
): Promise<Array<Message>> => {
  try {
    const getMessagesBetweenUsersQuery = `
      SELECT 
        id,
        sender_id,
        receiver_id,
        message_text,
        sent_at
      FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY sent_at ASC
    `;

    const result = await query(getMessagesBetweenUsersQuery, [
      senderId,
      receiverId,
    ]);

    return result.rows;
  } catch (error) {
    console.log("Error in getting messages between two users: ", error);
    throw new CustomError("Could not get messages between two users", 500);
  }
};

export const chatsBetweenTwoUsers = async (
  loggedInUserId: string,
  otherUserId: string,
): Promise<Array<Message>> => {
  try {
    const chatsBetweenTwoUsersQuery = `
      SELECT 
        id,
        sender_id,
        receiver_id,
        message_text,
        sent_at
      FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
        OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY sent_at ASC
    `;

    const result = await query(chatsBetweenTwoUsersQuery, [
      loggedInUserId,
      otherUserId,
    ]);

    return result.rows;
  } catch (error) {
    console.log("Error in getting messages between two users: ", error);
    throw new CustomError("Could not get messages between two users", 500);
  }
};
