import { Request, Response } from "express";

import CharService from "../services/charServices";
import { ICreateCharDTO, IUpdateCharDTO } from "../types/charDTOs";
import { httpStatusCodes } from "../responseHandlers/statusCodes";

const service = new CharService();

export default class CharController {
  async createChar(req: Request, res: Response) {
    const char: ICreateCharDTO = req.body;

    try {
      const result = await service.createChar(char);

      return res
        .status(httpStatusCodes.CREATED)
        .json({ id: result._id, nome: result.name });
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async getCharById(req: Request, res: Response) {
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

  async getChars(req: Request, res: Response) {
    const result = await service.getAll();

    return res.status(httpStatusCodes.OK).json(result);
  }

  async updateCharById(req: Request, res: Response) {
    const { id } = req.params;
    const char: IUpdateCharDTO = req.body;

    try {
      const result = await service.updateById(id, char);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async deleteCharById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const name = await service.deleteById(id);

      return res.status(httpStatusCodes.OK).json(`Char ${name} was deleted`);
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }
}
