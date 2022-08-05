import { create, readById } from "../repositories/urlRepository.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const { userId } = res.locals.userData;
  const { url } = req.body;
  const shortUrl = nanoid();

  try {
    await create({ userId, url, shortUrl });
    res.status(201).send({ shortUrl });
  } catch {
    res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;
  const response = await readById(id);
  if (response.length === 0) {
    return res.status(404).send("O id não corresponde a nenhuma URL");
  }

  res.status(200).send(response[0]);
}
