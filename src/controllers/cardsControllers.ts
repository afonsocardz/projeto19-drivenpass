import { Request, Response } from "express";
import { TCardData } from "../types/cardTypes";
import * as cardService from '../services/cardService';
import { User } from "@prisma/client";

export async function createCard(req: Request, res: Response) {
  const { id: userId } = res.locals.id;
  const card: TCardData = req.body;
  await cardService.createCard(card, userId);
  res.sendStatus(201);
}

export async function getCardById(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const id: number = Number(req.params.id);
  const card = await cardService.getCardById(id, userId);
  res.status(200).send(card);
}

export async function getCardsByUserId(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const cards = await cardService.getCardsByUserId(userId);
  res.status(200).send(cards);
}

export async function deleteCard(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const id: number = Number(req.params.id);
  await cardService.deleteCard(id, userId);
  res.sendStatus(200);
}