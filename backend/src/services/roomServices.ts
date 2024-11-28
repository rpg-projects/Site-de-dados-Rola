import { IRoom } from "../types/roomDTOs";
import { InternalError, NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";
import RoomRepository from "../repositories/roomRepository";

const userRepository = new UserRepository();
const repository = new RoomRepository();

export default class RoomService {
  async createRoom(name: string): Promise<IRoom> {
    return repository.create(name);
  }

  async getById(_id: string): Promise<IRoom> {
    const room = await repository.getById(_id);
    if (!room) throw new NotFound("Room");

    return room;
  }

  async getAll(): Promise<IRoom[]> {
    return repository.getAll();
  }

  async updateById(_id: string, roomName: string): Promise<IRoom> {
    const wasUpdated = await repository.updateById(_id, roomName);
    if (!wasUpdated) throw new NotFound("Room");

    return repository.getById(_id);
  }

  async deleteById(_id: string): Promise<string> {
    const roomDeleted = await repository.deleteById(_id);
    if (roomDeleted.deletedCount !== 1) throw new NotFound("Room");

    return _id;
  }
}
