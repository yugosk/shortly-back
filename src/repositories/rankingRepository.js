import connection from "../databaseStrategy/postgre.js";

export async function read() {
  const { rows: response } = await connection.query(`
    SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users
    JOIN urls ON users.id = urls."userId"
    GROUP BY users.id, users.name
    ORDER BY "visitCount" DESC
    LIMIT 10
    `);
  return response;
}
