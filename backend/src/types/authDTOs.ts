export interface IAuthDTO {
  email: string;
  password: string;
}

export interface IAuthPayload {
  user_id: string;
  player_id: string;
  token: string;
}

export interface ICompleteUser {
  _id: string;
  email: string;
  player_id: string;
  password: string;
}
