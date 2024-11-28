import roomModel from "../database/models/roomModel";
import mongoose from "mongoose";
import { BaseError } from "../responseHandlers/errorHandlers";
import { IRoom } from "../types/roomDTOs";

export default class RoomRepository {
  async create(roomName: string): Promise<IRoom> {
    return roomModel.create({ name: roomName }) as unknown as IRoom;
  }

  async getById(id: string): Promise<IRoom | undefined> {
    if (!mongoose.isValidObjectId(id))
      throw new BaseError("room can't be found", 404);

    return roomModel
      .findById(id, "_id name created_at")
      .exec() as unknown as IRoom;
  }

  async getAll(): Promise<IRoom[]> {
    return roomModel
      .find({}, "_id name created_at")
      .exec() as unknown as IRoom[];
  }

  async updateById(_id: string, roomName: string) {
    return roomModel.findOneAndUpdate({ _id }, { name: roomName }).exec();
  }

  async deleteById(_id: string) {
    return roomModel.deleteOne({ _id }).exec();
  }
}
