import { ICreateCharDTO, IUpdateCharDTO, IChar } from "../types/charDTOs";
import { InternalError, NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";
import CharRepository from "../repositories/charRepository";

const userRepository = new UserRepository();
const repository = new CharRepository();

export default class CharService {
  async createChar(char: ICreateCharDTO): Promise<IChar> {
    const user = await userRepository.getById(char.user_id);
    if (!user) throw new NotFound("user");

    return repository.create(char);
  }

  async getById(_id: string): Promise<IChar> {
    const char = await repository.getById(_id);
    if (!char) throw new NotFound("char");

    return char;
  }

  async getAll(): Promise<IChar[]> {
    return repository.getAll();
  }

  async updateById(_id: string, char: IUpdateCharDTO): Promise<IChar> {
    const wasUpdated = await repository.updateById(_id, char);
    if (!wasUpdated) throw new NotFound("char");

    return repository.getById(_id);
  }

  async deleteById(_id: string): Promise<string> {
    const charDeleted = await repository.deleteById(_id);
    if (charDeleted.deletedCount !== 1) throw new NotFound("Char");

    return _id;
  }
}
