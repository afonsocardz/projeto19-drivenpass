import { Network } from '@prisma/client';
export type TNetworkData = Omit<Network, 'id' | "userId">;