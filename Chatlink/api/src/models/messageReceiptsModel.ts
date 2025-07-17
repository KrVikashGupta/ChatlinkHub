import { query } from "../config/db";
import CustomError from "../utils/customError";

export const createMessageRecipetsTable = async (): Promise<void> => {
  const createMessageReceiptsTableQuery = `
    CREATE TABLE IF NOT EXISTS message_receipts (
      id SERIAL PRIMARY KEY, 
      message_id INT REFERENCES messages(id) ON DELETE CASCADE,
      receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
      sent_at TIMESTAMPTZ,
      read_at TIMESTAMPTZ,
      is_deleted BOOLEAN DEFAULT FALSE
    );
  `;
  await query(createMessageReceiptsTableQuery);
};

export const insertMessageReceipt = async (
  messageId: number,
  receiverId: string,
  sentAt: Date,
  isDeleted: boolean,
): Promise<void> => {
  try {
    const insertMessageReceiptQuery = `
      INSERT INTO message_receipts (message_id, receiver_id, sent_at, is_deleted)
      values ($1, $2, $3, $4) RETURNING *;
    `;

    const result = await query(insertMessageReceiptQuery, [
      messageId,
      receiverId,
      sentAt,
      isDeleted,
    ]);

    return result.rows[0];
  } catch (error) {
    console.log("Error inserting message receipt: ", error);
    throw new CustomError("Could not insert message receipt", 500);
  }
};
