import connection from "../databaseStrategy/postgre.js";

export async function readUserUrls(userId) {
  const { rows: response } = await connection.query(
    `
    SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1
    `,
    [userId]
  );
  return response;
}

export async function readUser(id) {
  const { rows: response } = await connection.query(
    `
    SELECT us.id AS id, us.name, SUM(urls."visitCount") AS "visitCount" FROM users us
    JOIN urls ON us.id = urls."userId"
    WHERE us.id = $1
    GROUP BY us.id
    `,
    [id]
  );
  return response[0];
}
