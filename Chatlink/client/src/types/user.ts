export interface User {
  id: string;
  email: string;
  username: string;
  profile_picture?: string;
  status_message?: string;
  is_online?: boolean;
  last_seen?: Date;
}

export interface SelectedUser extends Omit<User, "email"> {
  isTyping?: boolean;
  isOnline?: boolean;
}
