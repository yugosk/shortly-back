import { create } from "../repositories/authRepository.js";

export async function postSignUp(req, res) {
  const newUser = res.locals.user;
  try {
    await create(newUser);
    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
}
