import { ICreateUserDTO, IUpdateUserDTO, IUser } from "../types/userDTOs";
import { InternalError, NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import CharService from "./charServices";

const repository = new UserRepository();
const charService = new CharService();

export default class UserService {
  async createUser(user: ICreateUserDTO): Promise<IUser> {
    const emailExists = await repository.getByEmail(user.email);
    if (emailExists) throw new InternalError();

    if (user.player_id) {
      const discordExists = await repository.getByDiscordTag(user.player_id);
      if (discordExists) throw new InternalError();
    }

    const password = await bcrypt.hash(user.password, 10);

    const newUser: ICreateUserDTO = {
      email: user.email,
      player_id: user.player_id,
      password,
    };

    return repository.create(newUser);
  }

  async getById(_id: string): Promise<IUser> {
    const user = await repository.getById(_id);
    if (!user) throw new NotFound("User");

    return user;
  }

  async getAll(): Promise<IUser[]> {
    return repository.getAll();
  }

  async updateById(_id: string, user: IUpdateUserDTO): Promise<IUser> {
    const wasUpdated = await repository.updateById(_id, user);
    if (!wasUpdated) throw new NotFound("User");

    return repository.getById(_id);
  }

  async deleteById(_id: string): Promise<string> {
    // deletar chars do user!!
    const chars = await charService.getByUser(_id);

    for (const char of chars) {
      await charService.deleteById(char._id);
    }

    const userDeleted = await repository.deleteById(_id);
    if (userDeleted.deletedCount !== 1) throw new NotFound("User");

    return _id;
  }
}
