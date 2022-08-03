import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});
