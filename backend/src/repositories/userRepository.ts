import { ICreateUserDTO, IUser, IUpdateUserDTO } from "../types/userDTOs";

import userModel from "../database/models/userModel";
import mongoose from "mongoose";
import { BaseError } from "../responseHandlers/errorHandlers";

export default class UserRepository {
  async create(user: ICreateUserDTO): Promise<IUser> {
    return userModel.create(user) as unknown as IUser;
  }

  async getById(id: string): Promise<IUser | undefined> {
    if (!mongoose.isValidObjectId(id))
      throw new BaseError("User can't be found", 404);

    return userModel
      .findById(id, "_id email player_id activeChar")
      .exec() as unknown as IUser;
  }

  async getByEmail(email: string): Promise<IUser | undefined> {
    return userModel
      .findOne({ email }, "_id email player_id")
      .exec() as unknown as IUser;
  }

  async getByDiscordTag(tag: string): Promise<IUser | undefined> {
    return userModel
      .findOne({ tag }, "_id email player_id activeChar")
      .exec() as unknown as IUser;
  }

  async getAll(): Promise<IUser[]> {
    return userModel
      .find({}, "_id email player_id activeChar")
      .exec() as unknown as IUser[];
  }

  async updateById(_id: string, user: IUpdateUserDTO) {
    return userModel.findOneAndUpdate({ _id }, user).exec();
  }

  async deleteById(_id: string) {
    return userModel.deleteOne({ _id }).exec();
  }
}
