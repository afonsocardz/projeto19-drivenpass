import joi from 'joi'

const UserSchema = joi.object({
  email: joi.string().regex(/s/),
  password: joi.string().min(10),
})

export default UserSchema;