export interface ICreateUserDTO {
  email: string;
  player_id: string;
  password: string;
}

export interface IUpdateUserDTO {
  email?: string;
  player_id?: string;
}

export interface IUser {
  _id: string;
  email: string;
  player_id: string;
}
