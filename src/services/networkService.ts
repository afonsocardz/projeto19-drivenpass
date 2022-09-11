import Cryptr from "cryptr";
import { TNetworkData } from "../types/networkTypes";
import * as networkRepository from '../repositories/networkRepository';
import { Network } from "@prisma/client";

const SECRET: string | undefined = process.env.SECRET || 'banana';
const cryptr: Cryptr = new Cryptr(SECRET);

export async function deleteNetwork(id: number, userId: number) {
  await isNetworkExists(id, userId);
  await deleteNetworkById(id);
}

async function deleteNetworkById(id: number) {
  await networkRepository.deleteNetworkById(id);
}

export async function getNetworksByUserId(userId: number) {
  const networks = await networkRepository.getNetworksByUserId(userId);
  networks.map(network => decryptNetwork(network));
  return networks;
}

export async function getNetworkById(id: number, userId: number) {
  const network = await isNetworkExists(id, userId);
  decryptNetwork(network);
  return network;
}

function decryptNetwork(networkData: Network) {
  networkData.password = cryptr.decrypt(networkData.password);
}

async function isNetworkExists(id: number, userId: number) {
  const network = await networkRepository.getNetworkById(id, userId);
  if (!network) {
    throw { type: "notFound", message: "Network doesn't exists or it can't be accessed" };
  }
  return network;
}

export async function createNetwork(network: TNetworkData, userId: number) {
  encryptPassword(network);
  await networkRepository.createNetwork(network, userId);
}



function encryptPassword(network: TNetworkData) {
  network.password = cryptr.encrypt(network.password);
}