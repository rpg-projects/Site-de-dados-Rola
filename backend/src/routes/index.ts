import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import charRoutes from "./charRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/chars", charRoutes);

export default routes;
