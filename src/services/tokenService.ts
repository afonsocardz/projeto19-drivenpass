import dotenv from 'dotenv';
import { User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret';

export function signToken({ id }: User) {
  return {
    token: jwt.sign({ id }, TOKEN_SECRET)
  };
}

export function verifyToken(token: string | undefined): JwtPayload | string {
  if (!token){
    throw {type: 'notAuthorized'}
  }
  return jwt.verify(token, TOKEN_SECRET);
}