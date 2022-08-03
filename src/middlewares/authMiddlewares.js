import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { readByEmail } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

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
    return res.status(409).send("O email selecionado já está em uso");
  }

  next();
}

export async function validateSignInSchema(req, res, next) {
  const userCredentials = req.body;
  const { error } = signInSchema.validate(userCredentials, {
    abortEarly: false,
  });
  if (error) {
    return res.status(422).send(
      error.details.map((error) => {
        return error.message;
      })
    );
  }
  res.locals.credentials = userCredentials;
  next();
}

export async function checkCredentials(req, res, next) {
  const userCredentials = res.locals.credentials;
  const { email, password } = userCredentials;

  const dbCredentials = await readByEmail(email);
  if (dbCredentials.length === 0) {
    return res.status(401).send("O email não foi encontrado");
  }

  if (!bcrypt.compareSync(password, dbCredentials[0].password)) {
    return res.status(401).send("A senha digitada está incorreta");
  }

  res.locals.userId = dbCredentials[0].id;
  next();
}
