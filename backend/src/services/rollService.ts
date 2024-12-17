import { ICreateRollDTO, IMessageToRollDTO, IRoll } from "../types/rollDTOs";
import { NotFound } from "../responseHandlers/errorHandlers";
import UserRepository from "../repositories/userRepository";
import RollRepository from "../repositories/rollRepository";
import RoomRepository from "../repositories/roomRepository";
import MessageRepository from "../repositories/messageRepository";
import { getRandomIntInclusive, isNumeric } from "../utils/helpers";
import { IUser } from "../types/userDTOs";

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
  async checkForRolls(text: string) {
    if (text.startsWith("#d")) return true;
    else return false;
  }

  async createRoll(messageToRoll: IMessageToRollDTO): Promise<IRoll> {
    const { user_id, room_id, text } = messageToRoll;

    const user = await userRepository.getById(user_id);
    if (!user) throw new NotFound("User");
    const room = await roomRepository.getById(room_id);
    if (!room) throw new NotFound("Room");

    // se tiver dois # pega só o primeiro e o mod
    // onde tiver char, pega a frase seguinte sem o dado

    // char não pode ficar guardado no banco... tem que ser ativado na hora.
    // quando a pessoa mandar o char, eu busco no google drive e aparece a ficha??? e dicas???

    const [diceString, symbol, modString] = text.split("#d")[1].split(" ");

    const dice = getRandomIntInclusive(1, Number(diceString));
    let mod = 0;
    if (isNumeric(modString)) mod = Number(modString);

    let result: number;
    if (text.includes("+")) result = dice + mod;
    else if (text.includes("-")) result = dice - mod;
    else result = dice;

    const roll: ICreateRollDTO = {
      user_id,
      room_id,
      dice,
      mod,
      result,
    };

    return repository.create(roll);
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
