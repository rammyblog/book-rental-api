import { Request, Response } from 'express';
import Book from '../models/Book.model';
import {
  createBookSchemaInput,
  DeleteBookInput,
  ReadBookInput,
  UpdateBookInput,
} from '../schema/book.schema';
import {
  createBookService,
  deleteBookService,
  findBookService,
  updateBookService,
} from '../service/book.service';

export const createBookHandler = async (
  req: Request<{}, {}, createBookSchemaInput['body']>,
  res: Response
) => {
  try {
    const book = await createBookService(req.body);
    return res.send(book.toJSON());
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const getAllBookHandler = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    return res.send(books);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const getSingleBookHandler = async (
  req: Request<ReadBookInput['params']>,
  res: Response
) => {
  try {
    const bookId = req.params.id;
    const book = await findBookService({ _id: bookId });
    if (!book) {
      return res.send(404);
    }
    return res.status(200).send(book);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const updateBookHandler = async (
  req: Request<UpdateBookInput['params']>,
  res: Response
) => {
  try {
    const bookId = req.params.id;
    const update = req.body;
    const book = await findBookService({ _id: bookId });
    if (!book) {
      return res.send(404);
    }
    const updatedBook = await updateBookService({ _id: bookId }, update, {
      new: true,
    });
    return res.send(updatedBook);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const deleteBookHandler = async (
  req: Request<DeleteBookInput['params']>,
  res: Response
) => {
  try {
    const bookId = req.params.id;
    await deleteBookService({ _id: bookId });
    return res.status(200).send('Delete successful');
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
