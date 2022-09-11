import Cryptr from "cryptr";
import { TCredentialData } from "../types/credentialTypes";
import * as credentialRepository from '../repositories/credentialRepository';
import { Credential } from "@prisma/client";

const SECRET: string | undefined = process.env.SECRET || 'banana';
const cryptr: Cryptr = new Cryptr(SECRET);

export async function getCredentialById(id: number, userId: number) {
  const credential = await isCredentialExists(id, userId);
  decryptCredential(credential);
  return credential;
}

function decryptCredential(credentialData: Credential){
  credentialData.password = cryptr.decrypt(credentialData.password);
}

async function isCredentialExists(id: number, userId: number) {
  const credential = await credentialRepository.getCredentialById(id, userId);
  if(!credential){
    throw {type: "notFound", message: "Credential doesn't exists or it can't be accessed"};
  }
  return credential;
}

export async function createCredential(credential: TCredentialData, userId: number) {
  await isCredentialNameExists(credential, userId);
  encryptPassword(credential);
  await credentialRepository.createCredential(credential, userId);
}

async function isCredentialNameExists(credentialData: TCredentialData, id: number) {
  const credential = await credentialRepository.getCredentialByTitle(credentialData, id);
  if (credential) {
    throw { type: 'conflict' }
  }
}

function encryptPassword(credential: TCredentialData) {
  credential.password = cryptr.encrypt(credential.password);
}