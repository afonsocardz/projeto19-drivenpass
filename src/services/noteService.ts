import Cryptr from "cryptr";
import { TNoteData } from "../types/noteTypes";
import * as noteRepository from '../repositories/noteRepository';
import { Note } from "@prisma/client";

const SECRET: string | undefined = process.env.SECRET || 'banana';
const cryptr: Cryptr = new Cryptr(SECRET);

export async function deleteNote(id: number, userId: number) {
  await isNoteExists(id, userId);
  await deleteNoteById(id);
}

async function deleteNoteById(id: number) {
  await noteRepository.deleteNoteById(id);
}

export async function getNotesByUserId(userId: number) {
  const notes = await noteRepository.getNotesByUserId(userId);
  notes.map(note => decryptNote(note));
  return notes;
}

export async function getNoteById(id: number, userId: number) {
  const note = await isNoteExists(id, userId);
  decryptNote(note);
  return note;
}

function decryptNote(noteData: Note) {
  noteData.note = cryptr.decrypt(noteData.note);
}

async function isNoteExists(id: number, userId: number) {
  const note = await noteRepository.getNoteById(id, userId);
  if (!note) {
    throw { type: "notFound", message: "Note doesn't exists or it can't be accessed" };
  }
  return note;
}

export async function createNote(note: TNoteData, userId: number) {
  await isNoteNameExists(note, userId);
  encryptPassword(note);
  await noteRepository.createNote(note, userId);
}

async function isNoteNameExists(noteData: TNoteData, id: number) {
  const note = await noteRepository.getNoteByTitle(noteData, id);
  if (note) {
    throw { type: 'conflict' }
  }
}

function encryptPassword(note: TNoteData) {
  note.note = cryptr.encrypt(note.note);
}