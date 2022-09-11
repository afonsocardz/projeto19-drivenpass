import { Note } from '@prisma/client';
export type TNoteData = Omit<Note, 'id' | "userId">;