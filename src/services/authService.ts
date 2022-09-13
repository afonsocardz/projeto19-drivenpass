import bcrypt from "bcrypt";
import { TUserData } from "../types/userTypes";
import * as authRepository from '../repositories/authRepository';
import { signToken } from "./tokenService";
import { User } from "@prisma/client";

export async function signUp(userData: TUserData) {
  encyptPassword(userData);
  await authRepository.create(userData);
}

export async function login(userData: TUserData) {
  const user: User = await isUserExists(userData);
  validatePassword(userData, user);
  return signToken(user);
}


function validatePassword(userData: TUserData, user:User) {
  if(!user){
    throw {type: 'notAuthorized'};
  }
  const isValid: boolean = bcrypt.compareSync(userData.password, user.password)
  if (!isValid){
    throw {type: 'notAuthorized'};
  }
}

async function isUserExists(userData: TUserData) {
  return await authRepository.getUserByEmail(userData);
}

function encyptPassword(user: TUserData) {
  const SALTS: number = 10;
  user.password = bcrypt.hashSync(user.password, SALTS);
}
