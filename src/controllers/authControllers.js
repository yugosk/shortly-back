import { create, createSession } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export async function postSignUp(req, res) {
  const newUser = req.body;
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
  const tokenContent = res.locals.tokenContent;
  const key = process.env.JWT_KEY;
  const token = jwt.sign(tokenContent, key);

  try {
    res.status(200).send(token);
  } catch {
    res.sendStatus(500);
  }
}
