import { signUpSchema } from "../schemas/signUpSchema.js";
import { readByEmail } from "../repositories/authRepository.js";

export async function validateSignUpSchema(req, res, next) {
  const newUser = req.body;
  const { error } = signUpSchema.validate(newUser, { abortEarly: false });
  if (error) {
    return res.status(422).send(
      error.details.map((error) => {
        return error.message;
      })
    );
  }
  res.locals.user = newUser;
  next();
}

export async function checkEmail(req, res, next) {
  const { email } = res.locals.user;

  const emailCheck = await readByEmail(email);
  if (emailCheck.length !== 0) {
    return res.status(409).send("O email selecionado já está em uso!");
  }

  next();
}
