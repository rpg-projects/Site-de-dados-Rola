import { ICreateCharDTO, IChar, IUpdateCharDTO } from "../types/charDTOs";

import charModel from "../database/models/charModel";
import mongoose from "mongoose";
import { BaseError } from "../responseHandlers/errorHandlers";

export default class CharRepository {
  async create(char: ICreateCharDTO): Promise<IChar> {
    return charModel.create(char) as unknown as IChar;
  }

  async getById(id: string): Promise<IChar | undefined> {
    if (!mongoose.isValidObjectId(id))
      throw new BaseError("char can't be found", 404);

    return charModel
      .findById(id, "_id name user_id")
      .exec() as unknown as IChar;
  }

  async getAll(): Promise<IChar[]> {
    return charModel.find({}, "_id name user_id").exec() as unknown as IChar[];
  }

  async updateById(_id: string, char: IUpdateCharDTO) {
    return charModel.findOneAndUpdate({ _id }, char).exec();
  }

  async deleteById(_id: string) {
    return charModel.deleteOne({ _id }).exec();
  }
}
