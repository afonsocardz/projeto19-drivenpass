import { Request, Response } from "express";
import { TCredentialData } from "../types/credentialTypes";
import * as credentialService from '../services/credentialService';
import { Credential, User } from "@prisma/client";

export async function createCredential(req: Request, res: Response) {
  const { userId } = res.locals.id;
  const credential: TCredentialData = req.body;
  await credentialService.createCredential(credential, userId);
  res.sendStatus(201);
}

export async function getCredentialById(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const id: number = Number(req.params.id);
  const credential = await credentialService.getCredentialById(id, userId);
  res.status(200).send(credential);
}

export async function getCredentialsByUserId(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const credentials = await credentialService.getCredentialsByUserId(userId);
  res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const id: number = Number(req.params.id);
  await credentialService.deleteCredential(id, userId);
  res.sendStatus(200);
}