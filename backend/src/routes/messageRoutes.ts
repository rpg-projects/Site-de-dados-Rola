import { Router } from "express";
import MessageController from "../controllers/messageController";

const messageRoutes = Router();
const controller = new MessageController();

messageRoutes.post("/", controller.createMessage);
messageRoutes.get("/", controller.getMessages);
messageRoutes.get("/:id", controller.getMessageById);

export default messageRoutes;
