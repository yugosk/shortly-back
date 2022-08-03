import { create, createSession } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
dotenv.config();

export async function postSignUp(req, res) {
  const newUser = res.locals.user;
  const { name, email, password, confirmPassword } = newUser;
  const hashUser = {
    name,
    email,
    password: bcrypt.hashSync(password, Number(process.env.HASH)),
    confirmPassword: bcrypt.hashSync(confirmPassword, Number(process.env.HASH)),
  };
  try {
    await create(hashUser);
    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const userId = res.locals.userId;
  const token = uuid();
  const session = {
    userId,
    token,
  };
  try {
    await createSession(session);
    res.status(200).send(token);
  } catch {
    res.sendStatus(500);
  }
}
