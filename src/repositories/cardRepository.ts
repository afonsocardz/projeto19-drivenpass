import { prisma } from "../config/database";
import { TCardData } from "../types/cardTypes";

export async function getCardByTitle(card: TCardData, userId: number) {
  return await prisma.card.findFirst({ where: { title: card.title, userId } })
}

export async function createCard(card: TCardData, userId: number) {
  await prisma.card.create({
    data: { ...card, userId }
  });
}

export async function getCardById(id: number, userId: number) {
  return await prisma.card.findFirst({ where: { id, userId } });
}

export async function getCardsByUserId(userId: number) {
  return await prisma.card.findMany({ where: { userId } })
}

export async function deleteCardById(id: number) {
  await prisma.card.delete({ where: { id } });
}