import joi from "joi";

export const CredentialSchema = joi.object({
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  title: joi.string().required()
})