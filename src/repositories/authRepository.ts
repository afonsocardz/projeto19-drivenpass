import { User } from "@prisma/client";
import { prisma } from "../config/database";
import { TUserData } from "../types/userTypes";

export async function create(userData: TUserData) {
  await prisma.user.create({ data: userData });
}

export async function getUserByEmail(user: TUserData) {
  const userFound: User[] =  await prisma.user.findMany({
    where:
    {
      email: user.email
    }
  });
  return userFound[0];
}