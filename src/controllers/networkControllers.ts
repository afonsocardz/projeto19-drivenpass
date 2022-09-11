import { Request, Response } from "express";
import { TNetworkData } from "../types/networkTypes";
import * as networkService from '../services/networkService';
import { User } from "@prisma/client";

export async function createNetwork(req: Request, res: Response) {
  const { id: userId } = res.locals.id;
  const network: TNetworkData = req.body;
  await networkService.createNetwork(network, userId);
  res.sendStatus(201);
}

export async function getNetworkById(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const id: number = Number(req.params.id);
  const network = await networkService.getNetworkById(id, userId);
  res.status(200).send(network);
}

export async function getNetworksByUserId(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const networks = await networkService.getNetworksByUserId(userId);
  res.status(200).send(networks);
}

export async function deleteNetwork(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const id: number = Number(req.params.id);
  await networkService.deleteNetwork(id, userId);
  res.sendStatus(200);
}