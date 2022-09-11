import { Credential } from '@prisma/client';
export type TCredentialData = Omit<Credential, 'id' | "userId">;