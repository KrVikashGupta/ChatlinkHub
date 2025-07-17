import { query } from "../config/db";
import { LatestChat } from "../types/chat";
import { PublicUser, User } from "../types/user";
import CustomError from "../utils/customError";

// creates users table
export const createUserTable = async (): Promise<void> => {
  const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture TEXT,
    status_message VARCHAR(255),
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );
  `;

  await query(createUserTableQuery);
};

// inserts user in the user table
export const createUser = async (
  email: string,
  password: string,
  username: string,
): Promise<User> => {
  const createUserQuery = `
    INSERT INTO users (email, password, username) 
    VALUES ($1, $2, $3) RETURNING *;  
`;
  try {
    const result = await query(createUserQuery, [email, password, username]);
    return result.rows[0];
  } catch (error) {
    console.log("Error creating user: ", error);
    throw new CustomError("Could not create user", 500);
  }
};

// checks if email already exist
export const emailExist = async (email: string): Promise<Boolean> => {
  const emailCheckQuery = `
    SELECT * 
    FROM users
    WHERE email = $1;
  `;
  try {
    const result = await query(emailCheckQuery, [email]);
    // ?? => nullish coalescing operator
    return (result.rowCount ?? 0) > 0; // will fallback to 0 if rowcount is null
  } catch (error) {
    console.log("Error checking email existence: ", error);
    throw new CustomError("Could not check email existence", 500);
  }
};

// get user details
export const getUserDetails = async (email: string): Promise<User> => {
  const getUserDetailsQuery = `
    SELECT * 
    FROM users
    WHERE email = $1;
  `;
  try {
    const result = await query(getUserDetailsQuery, [email]);
    return result.rows[0];
  } catch (error) {
    console.log("Error getting user details ", error);
    throw new CustomError("Could not get user details", 500);
  }
};

// get user details by userId
export const getUserDetailsById = async (id: string): Promise<User> => {
  const getUserDetailsQuery = `
    SELECT 
    id,
    email,
    username,
    profile_picture,
    status_message,
    is_online,
    last_seen
    FROM users
    WHERE id = $1;
  `;
  try {
    const result = await query(getUserDetailsQuery, [id]);
    return result.rows[0];
  } catch (error) {
    console.log("Error getting user details by id", error);
    throw new CustomError("Could not get user details by id", 500);
  }
};

export const updateProfilePicture = async (
  id: string,
  profilePictureURL: string,
): Promise<void> => {
  const updateProfilePictureQuery = `
  UPDATE users
  SET profile_picture = $1
  WHERE id = $2
  `;

  try {
    await query(updateProfilePictureQuery, [profilePictureURL, id]);
  } catch (error) {
    console.log("Error updating profile picture", error);
    throw new CustomError("Could not update profile picture", 500);
  }
};

export const getProfilePictureById = async (id: string): Promise<string> => {
  const getProfilePictureQuery = `
    SELECT
    profile_picture 
    FROM users
    WHERE id = $1;
  `;
  try {
    const result = await query(getProfilePictureQuery, [id]);
    return result.rows[0].profile_picture;
  } catch (error) {
    console.log("Error getting user's profile picture", error);
    throw new CustomError("Could not get user's profile picture", 500);
  }
};

export const updateUserDetailsById = async (
  id: string,
  toUpdate: { username?: string; statusMessage?: string },
): Promise<void> => {
  const updates: Array<string> = [];

  if (toUpdate.username) {
    updates.push(`username = '${toUpdate.username}'`);
  }

  if (toUpdate.statusMessage) {
    updates.push(`status_message = '${toUpdate.statusMessage}'`);
  }

  const subQuery = updates.join(", ");

  const updateUserDetailsQuery = `
    UPDATE users
    SET ${subQuery} 
    WHERE id = $1;
  `;

  try {
    await query(updateUserDetailsQuery, [id]);
  } catch (error) {
    console.log("Error updating user details", error);
    throw new CustomError("Could not update user's details", 500);
  }
};

export const userNameExist = async (username: string): Promise<boolean> => {
  try {
    const userNameExistQuery = `
      SELECT COUNT(*) as count
      FROM users
      WHERE username = $1;
    `;

    const result = await query(userNameExistQuery, [username]);
    const count = Number(result.rows[0].count);

    return count === 0;
  } catch (error) {
    console.log("Error checking unique username", error);
    throw new CustomError("Could not check unique username", 500);
  }
};

export const allUsers = async (id: string): Promise<PublicUser[]> => {
  try {
    const allUsersQuery = `
      SELECT 
      id, 
      email, 
      username, 
      profile_picture, 
      status_message, 
      is_online, 
      last_seen 
      From users
      WHERE id != $1;
    `;

    const result = await query(allUsersQuery, [id]);

    const users: PublicUser[] = result.rows;
    return users;
  } catch (error) {
    console.log("Error getting users", error);
    throw new CustomError("Could not get users", 500);
  }
};

export const chatHistory = async (id: string): Promise<Array<LatestChat>> => {
  try {
    const chatHistoryQuery = `
      SELECT m1.*, 
        CASE 
          WHEN m1.sender_id = $1 THEN u2.username 
          ELSE u1.username 
        END AS username,
        CASE 
          WHEN m1.sender_id = $1 THEN u2.profile_picture 
          ELSE u1.profile_picture 
        END AS profile_picture,
        CASE 
          WHEN m1.sender_id = $1 THEN u2.id 
          ELSE u1.id 
        END AS user_id
      FROM messages m1
      JOIN (
          SELECT LEAST(sender_id, receiver_id) AS user1, GREATEST(sender_id, receiver_id) AS user2, MAX(sent_at) AS latest
          FROM messages
          WHERE sender_id = $1 OR receiver_id = $1
          GROUP BY user1, user2
      ) m2 ON LEAST(m1.sender_id, m1.receiver_id) = m2.user1 
            AND GREATEST(m1.sender_id, m1.receiver_id) = m2.user2 
            AND m1.sent_at = m2.latest
      LEFT JOIN users u1 ON m1.sender_id = u1.id
      LEFT JOIN users u2 ON m1.receiver_id = u2.id;
    `;

    const result = await query(chatHistoryQuery, [id]);
    const history = result.rows;
    return history;
  } catch (error) {
    console.log("Error getting chat history", error);
    throw new CustomError("Could not get chat history", 500);
  }
};

export const updateUserPasswordByEmail = async (
  email: string,
  newPassword: string,
): Promise<void> => {
  const updateUserPasswordQuery = `
    UPDATE users
    SET password = $2 
    WHERE email = $1;
  `;

  try {
    await query(updateUserPasswordQuery, [email, newPassword]);
  } catch (error) {
    console.log("Error updating user password", error);
    throw new CustomError("Could not update user's password", 500);
  }
};
