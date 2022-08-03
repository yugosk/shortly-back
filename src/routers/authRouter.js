import { Router } from "express";
import {
  validateSignUpSchema,
  checkEmail,
} from "../middlewares/signUpMiddlewares.js";
import { postSignUp } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUpSchema, checkEmail, postSignUp);

export default authRouter;
