import joi from 'joi';

export const NetworkSchema = joi.object({
  networkName: joi.string().required(),
  password: joi.string().required()
})