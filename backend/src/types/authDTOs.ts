export interface IAuthDTO {
  email: string;
  password: string;
}

export interface IAuthPayload {
  user_id: string;
  token: string;
}

export interface ICompleteUser {
  _id: string;
  email: string;
  password: string;
}
