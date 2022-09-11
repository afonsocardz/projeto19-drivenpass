import { prisma } from "../config/database";
import { TUserData } from "../types/userTypes";

export async function create(userData: TUserData) {
  await prisma.user.create({ data: userData });
}

export async function getUserByEmail(user: TUserData) {
  return await prisma.user.findFirstOrThrow({
    where:
    {
      email: user.email
    }
  });
}