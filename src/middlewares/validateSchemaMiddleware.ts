import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const { error } = schema.validate(data);
    if(error){
      return res.status(422).send(error.details);
    }
    next();
  }
}

