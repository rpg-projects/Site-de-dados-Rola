export interface IMessageToRollDTO {
  room_id: string;
  user_id: string;
  text: string;
}

export interface ICreateRollDTO {
  room_id: string;
  user_id: string;
  dice: number;
  mod?: number;
  result: number;
}

export interface IRoll {
  _id: string;
  room_id: string;
  user_id: string;
  char_id?: string;
  dice: number;
  mod?: number;
  result: number;
  created_at: Date;
}
