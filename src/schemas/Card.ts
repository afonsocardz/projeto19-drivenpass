import joi from 'joi';

export const CardSchema = joi.object({
  number: joi.string().required(),
  securityCode: joi.number().required(),
  cardholderName: joi.string().required(),
  expirationDate: joi.date(),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().equal('CREDIT', 'DEBIT', 'CREDIT_DEBIT'),
  title: joi.string().required(),
})

