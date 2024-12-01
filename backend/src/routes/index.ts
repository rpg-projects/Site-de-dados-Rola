import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import charRoutes from "./charRoutes";
import roomRoutes from "./roomRoutes";
import messageRoutes from "./messageRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/chars", charRoutes);
routes.use("/rooms", roomRoutes);
routes.use("/messages", messageRoutes);

export default routes;
