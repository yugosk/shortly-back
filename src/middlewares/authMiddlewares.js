import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { readByEmail } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export async function checkEmail(req, res, next) {
  const { email } = req.body;

  const emailCheck = await readByEmail(email);
  if (emailCheck.length !== 0) {
    return res.status(409).send("O email selecionado já está em uso");
  }

  next();
}

export async function checkCredentials(req, res, next) {
  const { email, password } = req.body;

  const dbCredentials = await readByEmail(email);
  if (
    dbCredentials.length === 0 ||
    !bcrypt.compareSync(password, dbCredentials[0].password)
  ) {
    return res
      .status(401)
      .send("O email não foi encontrado ou a senha digitada está incorreta");
  }

  res.locals.tokenContent = {
    userId: dbCredentials[0].id,
    email: dbCredentials[0].email,
  };

  next();
}

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  const key = process.env.JWT_KEY;

  try {
    const userData = jwt.verify(token, key);
    res.locals.userData = userData;
    next();
  } catch {
    res.status(401).send("Token inválido");
  }
}
