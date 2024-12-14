import { ICreateRollDTO, IMessageToRollDTO, IRoll } from "../types/rollDTOs";
import { NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";
import RollRepository from "../repositories/rollRepository";
import RoomRepository from "../repositories/roomRepository";
import MessageRepository from "../repositories/messageRepository";

const repository = new RollRepository();
const messageRepository = new MessageRepository();
const userRepository = new UserRepository();
const roomRepository = new RoomRepository();

// export interface ICreateRollDTO {
//   room_id: string;
//   user_id: string;
//   char_id?: string;
//   dice: number;
//   mod: number;
//   result: number;
// }

export default class RollService {
  async createRoll(messageToRoll: IMessageToRollDTO) {
    const { user_id, room_id, text } = messageToRoll;
    console.log("text :>> ", text);

    const user = await userRepository.getById(messageToRoll.user_id);
    if (!user) throw new NotFound("User");
    const room = await roomRepository.getById(messageToRoll.room_id);
    if (!room) throw new NotFound("Room");

    // se tiver dois # pega só o primeiro e o mod
    // onde tiver char, pega a frase seguinte sem o dado

    // char não pode ficar guardado no banco... tem que ser ativado na hora.
    // quando a pessoa mandar o char, eu busco no google drive e aparecem dicas de rolagem?

    const char = text.includes("/char")
      ? text.split("/char ")[1].split("#")[0]
      : undefined;

    console.log("char :>> ", char);

    // const roll : ICreateRollDTO = {
    //   user_id, room_id

    // }

    // return repository.create(roll);
  }

  async getById(_id: string): Promise<IRoll> {
    const roll = await repository.getById(_id);
    if (!roll) throw new NotFound("Roll");

    return roll;
  }

  async getAll(): Promise<IRoll[]> {
    return repository.getAll();
  }
}
