import { Router } from "express";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { validateToken } from "../middlewares/authMiddlewares.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { postUrl } from "../controllers/urlControllers.js";

const urlRouter = Router();

urlRouter.post(
  "/url/shorten",
  schemaMiddleware(urlSchema),
  validateToken,
  postUrl
);

export default urlRouter;
