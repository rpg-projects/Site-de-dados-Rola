import { ICreateMessageDTO, IMessage } from "../types/messageDTOs";

import messageModel from "../database/models/messageModel";
import mongoose from "mongoose";
import { BaseError } from "../responseHandlers/errorHandlers";

export default class MessageRepository {
  async create(message: ICreateMessageDTO): Promise<IMessage> {
    return messageModel.create(message) as unknown as IMessage;
  }

  async getById(id: string): Promise<IMessage | undefined> {
    if (!mongoose.isValidObjectId(id))
      throw new BaseError("Message can't be found", 404);

    return messageModel
      .findById(id, "_id name room_id user_id roll_id text created_at")
      .exec() as unknown as IMessage;
  }

  async getByRoom(room_id): Promise<IMessage[]> {
    return messageModel
      .find({ room_id }, "_id name room_id user_id roll_id text created_at")
      .sort({ created_at: "asc" })
      .exec() as unknown as IMessage[];
  }

  async deleteById(_id: string) {
    return messageModel.deleteOne({ _id }).exec();
  }
}
