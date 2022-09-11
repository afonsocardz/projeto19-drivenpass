import bcrypt from "bcrypt";
import { TUserData } from "../types/userTypes";
import * as authRepository from '../repositories/authRepository';
import { signToken } from "./tokenService";

export async function signUp(userData: TUserData) {
  await isUserExists(userData);
  encyptPassword(userData);
  await authRepository.create(userData);
}

export async function login(userData: TUserData) {
  const user = await validatePassword(userData);
  return signToken(user);
}


async function validatePassword(userData: TUserData) {
  const user = await authRepository.getUserByEmail(userData);
  const isValid: boolean = bcrypt.compareSync(userData.password, user.password)
  if (!isValid){
    throw {type: 'notAuthorized'};
  }
  return user;
}

async function isUserExists(userData: TUserData) {
  const user = await authRepository.getUserByEmail(userData);
  if (user) {
    throw { type: 'conflict', message: 'E-mail is been used by another user already' }
  }
}

function encyptPassword(user: TUserData) {
  const SALTS: number = 10;
  user.password = bcrypt.hashSync(user.password, SALTS);
}
