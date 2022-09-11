import { Card } from '@prisma/client';
export type TCardData = Omit<Card, 'id' | "userId">;