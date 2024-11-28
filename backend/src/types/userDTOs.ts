export interface ICreateUserDTO {
  name: string;
  password: string;
}

export interface IUpdateUserDTO {
  name?: string;
}

export interface IUser {
  _id: string;
  name: string;
}
