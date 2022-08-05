import { Router } from "express";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { validateToken } from "../middlewares/authMiddlewares.js";
import { urlSchema } from "../schemas/urlSchema.js";
import { postUrl, getUrl } from "../controllers/urlControllers.js";

const urlRouter = Router();

urlRouter.post(
  "/urls/shorten",
  schemaMiddleware(urlSchema),
  validateToken,
  postUrl
);
urlRouter.get("/urls/:id", getUrl);

export default urlRouter;
