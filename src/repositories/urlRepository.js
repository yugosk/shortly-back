import connection from "../databaseStrategy/postgre.js";

export async function create(object) {
  const { userId, url, shortUrl } = object;
  const { rows: response } = await connection.query(
    `
  INSERT INTO urls ("userId", url, "shortUrl", "visitCount") VALUES ($1, $2, $3, 0)
  `,
    [userId, url, shortUrl]
  );
  return response;
}

export async function readById(id) {
  const { rows: response } = await connection.query(
    `
    SELECT id, "shortUrl", url FROM urls WHERE id = $1
    `,
    [id]
  );
  return response;
}

export async function readByShortUrl(url) {
  const { rows: response } = await connection.query(
    `
    SELECT url FROM urls WHERE "shortUrl" = $1
    `,
    [url]
  );
  return response;
}

export async function updateVisitCount(url) {
  await connection.query(
    `
    UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1
    `,
    [url]
  );
}

export async function readIdAndUserId(id, userId) {
  const { rows: response } = await connection.query(
    `
    SELECT * FROM urls WHERE id = $1 AND "userId" = $2
    `,
    [id, userId]
  );
  return response;
}

export async function deleteById(id) {
  await connection.query(
    `
    DELETE FROM urls WHERE id = $1
    `,
    [id]
  );
}
