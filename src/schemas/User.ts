import joi from 'joi'
import { TUserData } from '../types/userTypes';

const UserSchema = joi.object<TUserData>({
  email: joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: joi.string().min(10),
})

export default UserSchema;