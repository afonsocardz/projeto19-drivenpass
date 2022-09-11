import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/tokenService";

export function validateToken(req: Request, res: Response, next: NextFunction){
  const token: string | undefined = req.headers?.authorization;
  res.locals.id = verifyToken(token);
  next();
}