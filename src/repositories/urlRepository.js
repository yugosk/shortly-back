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
