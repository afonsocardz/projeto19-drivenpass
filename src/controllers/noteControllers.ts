import { Request, Response } from "express";
import { TNoteData } from "../types/noteTypes";
import * as noteService from '../services/noteService';
import { User } from "@prisma/client";

export async function createNote(req: Request, res: Response) {
  const { id: userId } = res.locals.id;
  const note: TNoteData = req.body;
  await noteService.createNote(note, userId);
  res.sendStatus(201);
}

export async function getNoteById(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const id: number = Number(req.params.id);
  const note = await noteService.getNoteById(id, userId);
  res.status(200).send(note);
}

export async function getNotesByUserId(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const notes = await noteService.getNotesByUserId(userId);
  res.status(200).send(notes);
}

export async function deleteNote(req: Request, res: Response) {
  const { id: userId }: User = res.locals.id;
  const id: number = Number(req.params.id);
  await noteService.deleteNote(id, userId);
  res.sendStatus(200);
}