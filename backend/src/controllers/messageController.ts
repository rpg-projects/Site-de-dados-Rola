import { Request, Response } from "express";

import MessageService from "../services/messageServices";
import { httpStatusCodes } from "../responseHandlers/statusCodes";
import { ICreateMessageDTO } from "../types/messageDTOs";

const service = new MessageService();

export default class MessageController {
  async createMessage(req: Request, res: Response) {
    const message: ICreateMessageDTO = req.body;

    try {
      const result = await service.createMessage(message);

      return res.status(httpStatusCodes.CREATED).json(result);
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

  async getMessages(req: Request, res: Response) {
    const result = await service.getAll();

    return res.status(httpStatusCodes.OK).json(result);
  }
}
