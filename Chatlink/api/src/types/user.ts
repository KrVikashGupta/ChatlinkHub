export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  profile_picture?: string;
  status_message?: string;
  is_online?: boolean;
  last_seen?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export type PublicUser = Omit<User, "password">;
