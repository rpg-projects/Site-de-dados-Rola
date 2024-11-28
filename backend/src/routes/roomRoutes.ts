import { Router } from "express";
import RoomController from "../controllers/roomController";

const roomRoutes = Router();
const controller = new RoomController();

roomRoutes.post("/", controller.createRoom);
roomRoutes.get("/", controller.getRooms);
roomRoutes.get("/:id", controller.getRoomById);
roomRoutes.put("/:id", controller.updateRoomById);
roomRoutes.delete("/:id", controller.deleteRoomById);

export default roomRoutes;
