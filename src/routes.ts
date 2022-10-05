import { Express, Request, Response } from 'express';
import {
  createGenreHandler,
  deleteGenreHandler,
  getAllGenreHandler,
  getSingleGenreHandler,
  updateGenreHandler,
} from './controller/genre.controller';
import {
  createUserHandler,
  loginUserHandler,
} from './controller/user.controller';
import { requireAdminUser, requireUser } from './middleware/checkUser';
import validate from './middleware/validateResource';
import {
  createGenreSchema,
  deleteGenreSchema,
  getGenreSchema,
  updateGenreSchema,
} from './schema/genre.schema';
import { createUserSchema, loginUserSchema } from './schema/user.schema';

export default function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // users
  app.post('/api/users', validate(createUserSchema), createUserHandler);
  app.post('/api/users/login', validate(loginUserSchema), loginUserHandler);

  // Genre
  app.get('/api/genres', requireUser, getAllGenreHandler);
  app.post(
    '/api/genres',
    [requireAdminUser, validate(createGenreSchema)],
    createGenreHandler
  );
  app.get(
    '/api/genre/:id',
    [requireUser, validate(getGenreSchema)],
    getSingleGenreHandler
  );
  app.put(
    '/api/genre/:id',
    [requireAdminUser, validate(updateGenreSchema)],
    updateGenreHandler
  );
  app.delete(
    '/api/genre/:id',
    [requireAdminUser, validate(deleteGenreSchema)],
    deleteGenreHandler
  );
}
