export interface Message {
  id: number;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  sent_at: Date;
  is_deleted?: boolean;
}
