import { readById, readIdAndUserId } from "../repositories/urlRepository.js";

export async function urlMiddleware(req, res, next) {
  const { userId } = res.locals.userData;
  const { id } = req.params;

  const checkId = await readById(id);
  if (checkId.length === 0) {
    return res.status(404).send("O id não pertence a nenhuma URL");
  }

  const checkUser = await readIdAndUserId(id, userId);
  if (checkUser.length === 0) {
    return res.status(401).send("A URL não pertence ao usuário logado");
  }

  next();
}
