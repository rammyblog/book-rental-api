import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

interface IZodIssue {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}
interface IErrorObj {
  [key: string]: string;
}

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const error_obj: IErrorObj = {};
      error.errors.map(({ message, path }: IZodIssue) => {
        error_obj[path[1]] = message;
      });
      return res.status(400).send(error_obj);
    }
  };

export default validate;
