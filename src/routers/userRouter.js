import { Router } from "express";
import { validateToken } from "../middlewares/authMiddlewares.js";
import { getUserStats } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.get("/users/me", validateToken, getUserStats);

export default userRouter;
