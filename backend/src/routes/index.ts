import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import charRoutes from "./charRoutes";
import roomRoutes from "./roomRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/chars", charRoutes);
routes.use("/rooms", roomRoutes);

export default routes;
