import connection from "../databaseStrategy/postgre.js";

export async function readByEmail(email) {
  const { rows: response } = await connection.query(
    `SELECT id, email, password FROM users WHERE email = $1`,
    [email]
  );
  return response;
}

export async function create(user) {
  const { name, email, password, confirmPassword } = user;
  await connection.query(
    `INSERT INTO users (name, email, password, "confirmPassword") VALUES ($1, $2, $3, $4)`,
    [name, email, password, confirmPassword]
  );
}

export async function createSession(session) {
  const { userId, token } = session;
  await connection.query(
    `INSERT INTO sessions ("userId", token) VALUES ($1, $2)`,
    [userId, token]
  );
}
