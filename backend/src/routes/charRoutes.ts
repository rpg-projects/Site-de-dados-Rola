import { Router } from "express";
import CharController from "../controllers/charController";

const charRoutes = Router();
const controller = new CharController();

charRoutes.post("/", controller.createChar);
charRoutes.get("/user/:user_id", controller.getCharsByUser);
charRoutes.get("/:id", controller.getCharById);
charRoutes.put("/:id", controller.updateCharById);
charRoutes.delete("/:id", controller.deleteCharById);

export default charRoutes;
