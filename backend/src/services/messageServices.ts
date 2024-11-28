import { ICreateMessageDTO, IMessage } from "../types/messageDTOs";
import { InternalError, NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";
import MessageRepository from "../repositories/messageRepository";

const repository = new MessageRepository();

export default class MessageService {
  async createMessage(Message: ICreateMessageDTO): Promise<IMessage> {
    const user = await userRepository.getById(Message.user_id);
    if (!user) throw new NotFound("user");

    return repository.create(Message);
  }

  async getById(_id: string): Promise<IMessage> {
    const message = await repository.getById(_id);
    if (!message) throw new NotFound("Message");

    return message;
  }

  async getAll(): Promise<IMessage[]> {
    return repository.getAll();
  }

  async deleteById(_id: string): Promise<string> {
    const messageDeleted = await repository.deleteById(_id);
    if (messageDeleted.deletedCount !== 1) throw new NotFound("Message");

    return _id;
  }
}
