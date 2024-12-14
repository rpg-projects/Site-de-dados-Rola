import { ICreateRollDTO, IRoll } from "../types/rollDTOs";

import rollModel from "../database/models/rollModel";
import mongoose from "mongoose";
import { BaseError } from "../responseHandlers/errorHandlers";

export default class RollRepository {
  async create(roll: ICreateRollDTO): Promise<IRoll> {
    return rollModel.create(roll) as unknown as IRoll;
  }

  async getById(id: string): Promise<IRoll | undefined> {
    if (!mongoose.isValidObjectId(id))
      throw new BaseError("Roll can't be found", 404);

    return rollModel
      .findById(id, "_id room_id user_id char_id dice mod result created_at")
      .exec() as unknown as IRoll;
  }

  async getAll(): Promise<IRoll[]> {
    return rollModel
      .find({}, "_id room_id user_id char_id dice mod result created_at")
      .exec() as unknown as IRoll[];
  }

  async deleteById(_id: string) {
    return rollModel.deleteOne({ _id }).exec();
  }
}
