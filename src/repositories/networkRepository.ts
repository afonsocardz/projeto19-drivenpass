import { prisma } from "../config/database";
import { TNetworkData } from "../types/networkTypes";


export async function createNetwork(network: TNetworkData, userId: number) {
  await prisma.network.create({
    data: { ...network, userId }
  });
}

export async function getNetworkById(id: number, userId: number) {
  return await prisma.network.findFirst({ where: { id, userId } });
}

export async function getNetworksByUserId(userId: number) {
  return await prisma.network.findMany({ where: { userId } })
}

export async function deleteNetworkById(id: number) {
  await prisma.network.delete({ where: { id } });
}