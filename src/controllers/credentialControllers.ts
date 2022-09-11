import { Request, Response } from "express";
import { TCredentialData } from "../types/credentialTypes";
import * as credentialService from '../services/credentialService';
import { User } from "@prisma/client";

export async function createCredential(req: Request, res: Response) {
  const { id }: User = res.locals.id;
  const credential: TCredentialData = req.body;
  await credentialService.createCredential(credential, id);
  res.sendStatus(201);
}