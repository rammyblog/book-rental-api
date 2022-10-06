import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import Book, { BookDocument } from '../models/Book.model';

export const createBookService = async (
  input: DocumentDefinition<Omit<BookDocument, 'createdAt' | 'updatedAt'>>
) => {
  try {
    const book = await Book.create(input);
    return book;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findBookService = async (
  query: FilterQuery<BookDocument>,
  options: QueryOptions = { lean: true }
) => {
  return Book.findOne(query, {}, options);
};

export const updateBookService = async (
  query: FilterQuery<BookDocument>,
  update: UpdateQuery<BookDocument>,
  options: QueryOptions
) => {
  return Book.findByIdAndUpdate(query, update, options);
};

export async function deleteBookService(query: FilterQuery<BookDocument>) {
  return Book.deleteOne(query);
}
