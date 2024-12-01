export interface IAuthDTO {
  username: string;
  password: string;
}

export interface IAuthPayload {
  user_id: string;
  token: string;
}

export interface ICompleteUser {
  _id: string;
  username: string;
  password: string;
}
