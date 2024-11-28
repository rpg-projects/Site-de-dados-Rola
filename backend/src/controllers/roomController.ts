import { Request, Response } from "express";

import RoomService from "../services/roomServices";
import { httpStatusCodes } from "../responseHandlers/statusCodes";

const service = new RoomService();

export default class RoomController {
  async createRoom(req: Request, res: Response) {
    const name: string = req.body.name;

    try {
      const result = await service.createRoom(name);

      return res
        .status(httpStatusCodes.CREATED)
        .json({ id: result._id, nome: result.name });
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async getRoomById(req: Request, res: Response) {
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

  async getRooms(req: Request, res: Response) {
    const result = await service.getAll();

    return res.status(httpStatusCodes.OK).json(result);
  }

  async updateRoomById(req: Request, res: Response) {
    const { id } = req.params;
    const name: string = req.body.name;

    try {
      const result = await service.updateById(id, name);

      return res.status(httpStatusCodes.OK).json(result);
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }

  async deleteRoomById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const name = await service.deleteById(id);

      return res.status(httpStatusCodes.OK).json(`Room ${name} was deleted`);
    } catch (error) {
      return res
        .status(error.status ?? httpStatusCodes.BAD_REQUEST)
        .json(error.message ?? error);
    }
  }
}
