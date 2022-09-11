import Cryptr from "cryptr";
import { TCardData } from "../types/cardTypes";
import * as cardRepository from '../repositories/cardRepository';
import { Card } from "@prisma/client";

const SECRET: string | undefined = process.env.SECRET || 'banana';
const cryptr: Cryptr = new Cryptr(SECRET);

export async function deleteCard(id: number, userId: number) {
  await isCardExists(id, userId);
  await deleteCardById(id);
}

async function deleteCardById(id: number) {
  await cardRepository.deleteCardById(id);
}

export async function getCardsByUserId(userId: number) {
  const cards = await cardRepository.getCardsByUserId(userId);
  cards.map(card => decryptCard(card));
  return cards;
}

export async function getCardById(id: number, userId: number) {
  const card = await isCardExists(id, userId);
  decryptCard(card);
  return card;
}

function decryptCard(cardData: Card) {
  cardData.password = cryptr.decrypt(cardData.password);
}

async function isCardExists(id: number, userId: number) {
  const card = await cardRepository.getCardById(id, userId);
  if (!card) {
    throw { type: "notFound", message: "Card doesn't exists or it can't be accessed" };
  }
  return card;
}

export async function createCard(card: TCardData, userId: number) {
  await isCardNameExists(card, userId);
  encryptPassword(card);
  await cardRepository.createCard(card, userId);
}

async function isCardNameExists(cardData: TCardData, id: number) {
  const card = await cardRepository.getCardByTitle(cardData, id);
  if (card) {
    throw { type: 'conflict' }
  }
}

function encryptPassword(card: TCardData) {
  card.password = cryptr.encrypt(card.password);
}