export interface LatestChat {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  sent_at: string;
  is_delete: boolean;
  username: string;
  profile_picture: string;
  user_id: string;
}

export interface Message {
  id: number;
  is_deleted: boolean;
  message_text: string;
  receiver_id: string;
  sender_id: string;
  sent_at: string;
}
