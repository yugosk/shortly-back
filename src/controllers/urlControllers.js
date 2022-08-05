import { create } from "../repositories/urlRepository.js";
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
