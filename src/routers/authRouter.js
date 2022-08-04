import { Router } from "express";
import {
  checkEmail,
  checkCredentials,
} from "../middlewares/authMiddlewares.js";
import { postSignUp, signIn } from "../controllers/authControllers.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  schemaMiddleware(signUpSchema),
  checkEmail,
  postSignUp
);
authRouter.post(
  "/signin",
  schemaMiddleware(signInSchema),
  checkCredentials,
  signIn
);

export default authRouter;
