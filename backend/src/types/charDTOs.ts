export interface ICreateCharDTO {
  name: string;
  user_id: string;
}

export interface IUpdateCharDTO {
  name?: string;
}

export interface IChar {
  _id: string;
  name: string;
  user_id: string;
}
