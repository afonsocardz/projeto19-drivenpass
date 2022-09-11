import bcrypt from "bcrypt";
import { TUserData } from "../types/userTypes";
import * as authRepository from '../repositories/authRepository';

export async function signUp(userData: TUserData) {
  await isEmailExists(userData);
  encyptPassword(userData);
  await authRepository.create(userData);
}

async function isEmailExists(userData: TUserData) {
  const user = await authRepository.getUserByEmail(userData);
  if (user) {
    throw { type: 'conflict', message: 'E-mail is been used by another user already' }
  }
}

function encyptPassword(user: TUserData) {
  const SALTS: number = 10;
  user.password = bcrypt.hashSync(user.password, SALTS);
}
