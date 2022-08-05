import { read } from "../repositories/rankingRepository.js";

function mapRanking(obj) {
  const linksCount = Number(obj.linksCount);
  const visitCount = Number(obj.visitCount);
  return { ...obj, linksCount, visitCount };
}

export async function getRanking(req, res) {
  try {
    const response = await read();
    res.status(200).send(response.map(mapRanking));
  } catch {
    res.sendStatus(500);
  }
}
