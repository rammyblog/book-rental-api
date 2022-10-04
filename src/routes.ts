import { Express, Request, Response } from 'express';
import {
  createUserHandler,
  loginUserHandler,
} from './controller/user.controller';
import validate from './middleware/validateResource';
import { createUserSchema, loginUserSchema } from './schema/user.schema';

export default function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/users', validate(createUserSchema), createUserHandler);
  app.post('/api/users/login', validate(loginUserSchema), loginUserHandler);
}
// user
