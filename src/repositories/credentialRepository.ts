import { prisma } from "../config/database";
import { TCredentialData } from "../types/credentialTypes";

export async function getCredentialByTitle(credential: TCredentialData, userId: number) {
  return await prisma.credential.findFirst({ where: { title: credential.title, userId } })
}

export async function createCredential(credential: TCredentialData, userId: number) {
  await prisma.credential.create({
    data: { ...credential, userId }
  });
}

export async function getCredentialById(id: number, userId: number) {
  return await prisma.credential.findFirst({ where: { id, userId } });
}

export async function getCredentialsByUserId(userId: number) {
  return await prisma.credential.findMany({ where: { userId } })
}

export async function deleteCredentialById(id: number) {
  await prisma.credential.delete({ where: { id } });
}