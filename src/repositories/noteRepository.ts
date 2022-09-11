import { prisma } from "../config/database";
import { TNoteData } from "../types/noteTypes";

export async function getNoteByTitle(note: TNoteData, userId: number) {
  return await prisma.note.findFirst({ where: { title: note.title, userId } })
}

export async function createNote(note: TNoteData, userId: number) {
  await prisma.note.create({
    data: { ...note, userId }
  });
}

export async function getNoteById(id: number, userId: number) {
  return await prisma.note.findFirst({ where: { id, userId } });
}

export async function getNotesByUserId(userId: number) {
  return await prisma.note.findMany({ where: { userId } })
}

export async function deleteNoteById(id: number) {
  await prisma.note.delete({ where: { id } });
}