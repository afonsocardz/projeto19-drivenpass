import joi from 'joi';

export const NoteSchema = joi.object({
  note: joi.string().max(1000),
  title: joi.string().max(50)
})