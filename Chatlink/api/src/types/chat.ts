export interface LatestChat {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  sent_at: Date;
  is_delete: boolean;
  username: string;
  profile_picture: string;
  user_id: string;
}
