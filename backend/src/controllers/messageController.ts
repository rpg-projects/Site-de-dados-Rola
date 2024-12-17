import { Request, Response } from "express";

import MessageService from "../services/messageServices";
import { httpStatusCodes } from "../responseHandlers/statusCodes";
import { ICreateMessageDTO } from "../types/messageDTOs";
import RollService from "../services/rollService";
import UserService from "../services/userServices";
import { IRoll } from "../types/rollDTOs";

const service = new MessageService();
const rollService = new RollService();
const userService = new UserService();

export default class MessageController {
  async createMessage(req: Request, res: Response) {
    const message: ICreateMessageDTO = req.body;
    const { room_id, user_id, text } = message;

    try {
      const isRoll = await rollService.checkForRolls(text);

      let roll: IRoll;
      if (isRoll) {
        roll = await rollService.createRoll({
          room_id,
          user_id,
          text,
        });
      }

      const { _id, created_at } = await service.createMessage({
        roll_id: roll ? roll._id : undefined,
        ...message,
      });

      const { player_id, activeChar } = await service.defineActiveChar(message);

      const response = {
        _id,
        room_id,
        user_id,
        activeChar,
        player_id,
        text,
        created_at,
        roll_id: roll ? roll._id : undefined,
        dice: roll ? roll.dice : undefined,
        mod: roll ? roll.mod : undefined,
        result: roll ? roll.result : undefined,
      };

      return res.status(httpStatusCodes.CREATED).json(response);
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async getMessageById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await service.getById(id);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error: any) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async getMessagesByRoom(req: Request, res: Response) {
    const { room_id } = req.params;
    const result = await service.getByRoom(room_id);

    return res.status(httpStatusCodes.OK).json(result);
  }
}
