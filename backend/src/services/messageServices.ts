import { ICreateMessageDTO, IMessage } from "../types/messageDTOs";
import { InternalError, NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";
import MessageRepository from "../repositories/messageRepository";
import RoomRepository from "../repositories/roomRepository";

const repository = new MessageRepository();
const userRepository = new UserRepository();
const roomRepository = new RoomRepository();

export default class MessageService {
  async createMessage(message: ICreateMessageDTO): Promise<IMessage> {
    const user = await userRepository.getById(message.user_id);
    if (!user) throw new NotFound("User");
    const room = await roomRepository.getById(message.room_id);
    if (!room) throw new NotFound("Room");

    return repository.create(message);
  }

  async getById(_id: string): Promise<IMessage> {
    const message = await repository.getById(_id);
    if (!message) throw new NotFound("Message");

    return message;
  }

  async getAll(): Promise<IMessage[]> {
    return repository.getAll();
  }
}
