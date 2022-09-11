import { Request, Response } from "express";
import { TUserData } from "../types/userTypes";
import * as authService from "../services/authService";

async function signUp (req: Request, res: Response){
  const user: TUserData = req.body;
  await authService.signUp(user);
  return res.sendStatus(201);
}

export {signUp}