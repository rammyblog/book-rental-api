import { Express, Request, Response } from 'express';
import {
  getAllBookHandler,
  createBookHandler,
  getSingleBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from './controller/book.controller';
import {
  createGenreHandler,
  deleteGenreHandler,
  getAllGenreHandler,
  getSingleGenreHandler,
  updateGenreHandler,
} from './controller/genre.controller';
import {
  getRentedBookHandler,
  rentBookHandler,
  returnBookHandler,
} from './controller/rent.controller';
import {
  createUserHandler,
  loginUserHandler,
} from './controller/user.controller';
import { requireAdminUser, requireUser } from './middleware/checkUser';
import validate from './middleware/validateResource';
import {
  createBookSchema,
  getBookSchema,
  updateBookSchema,
  deleteBookSchema,
} from './schema/book.schema';
import {
  createGenreSchema,
  deleteGenreSchema,
  getGenreSchema,
  updateGenreSchema,
} from './schema/genre.schema';
import { rentBookSchema, updateRentBookSchema } from './schema/rent.schema';
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
    '/api/genres/:id',
    [requireUser, validate(getGenreSchema)],
    getSingleGenreHandler
  );
  app.put(
    '/api/genres/:id',
    [requireAdminUser, validate(updateGenreSchema)],
    updateGenreHandler
  );
  app.delete(
    '/api/genres/:id',
    [requireAdminUser, validate(deleteGenreSchema)],
    deleteGenreHandler
  );

  // Book
  app.get('/api/books', requireUser, getAllBookHandler);
  app.post(
    '/api/books',
    [requireAdminUser, validate(createBookSchema)],
    createBookHandler
  );
  app.get(
    '/api/books/:id',
    [requireUser, validate(getBookSchema)],
    getSingleBookHandler
  );
  app.put(
    '/api/books/:id',
    [requireAdminUser, validate(updateBookSchema)],
    updateBookHandler
  );
  app.delete(
    '/api/books/:id',
    [requireAdminUser, validate(deleteBookSchema)],
    deleteBookHandler
  );

  // rent book
  app.post(
    '/api/rent/book',
    [requireUser, validate(rentBookSchema)],
    rentBookHandler
  );

  app.get('/api/rent/book', requireUser, getRentedBookHandler);

  // Return book
  app.post(
    '/api/rent/book/:bookId',
    [requireUser, validate(updateRentBookSchema)],
    returnBookHandler
  );
}
