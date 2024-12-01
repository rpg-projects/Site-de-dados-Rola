export interface ICreateMessageDTO {
  room_id: string;
  user_id: string;
  text: string;
}

export interface IMessage {
  _id: string;
  room_id: string;
  user_id: string;
  roll_id?: string;
  text: string;
  created_at: Date;
}
