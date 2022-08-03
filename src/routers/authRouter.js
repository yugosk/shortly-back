import { Router } from "express";
import {
  validateSignUpSchema,
  checkEmail,
  validateSignInSchema,
  checkCredentials,
} from "../middlewares/authMiddlewares.js";
import { postSignUp, signIn } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUpSchema, checkEmail, postSignUp);
authRouter.post("/signin", validateSignInSchema, checkCredentials, signIn);

export default authRouter;
