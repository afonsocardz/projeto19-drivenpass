import Cryptr from "cryptr";
import { TCredentialData } from "../types/credentialTypes";
import * as credentialRepository from '../repositories/credentialRepository';

const SECRET: string | undefined = process.env.SECRET || 'banana';
const cryptr: Cryptr = new Cryptr(SECRET);

export async function createCredential(credential: TCredentialData, id: number) {
  await isCredentialNameExists(credential, id);
  encryptPassword(credential);
  await credentialRepository.createCredential(credential, id);
}

async function isCredentialNameExists(credentialData: TCredentialData, id: number) {
  const credential = await credentialRepository.getCredentialByTitle(credentialData, id);
  if (credential) {
    throw { type: 'conflict' }
  }
}

function encryptPassword(credential: TCredentialData){
  credential.password = cryptr.encrypt(credential.password);
}