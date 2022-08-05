import { Router } from "express";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { validateToken } from "../middlewares/authMiddlewares.js";
import { urlSchema } from "../schemas/urlSchema.js";
import {
  postUrl,
  getUrl,
  redirect,
  deleteUrl,
} from "../controllers/urlControllers.js";
import { urlMiddleware } from "../middlewares/urlMiddlewares.js";

const urlRouter = Router();

urlRouter.post(
  "/urls/shorten",
  schemaMiddleware(urlSchema),
  validateToken,
  postUrl
);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", redirect);
urlRouter.delete("/urls/:id", validateToken, urlMiddleware, deleteUrl);

export default urlRouter;
