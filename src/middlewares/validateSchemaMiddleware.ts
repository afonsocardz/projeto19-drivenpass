import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
  (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { value, error } = schema.validate(data);
    if(error){
      res.sendStatus(422);
    }
    res.locals.data = value;
    next();
  }
}

