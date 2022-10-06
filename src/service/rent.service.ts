import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import Book, { BookDocument } from '../models/Book.model';
import Rent, { RentDocument } from '../models/Rent.model';

export const rentBookService = async (
  input: DocumentDefinition<Omit<RentDocument, 'createdAt' | 'updatedAt'>>
) => {
  try {
    const rentedBook = await Rent.create(input);
    return rentedBook;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getBorrowedBooks = async (
  query: FilterQuery<RentDocument>,
  options: QueryOptions
) => {
  return Rent.findOne(query, {}, options);
};

export const updateRentService = async (
  query: FilterQuery<BookDocument>,
  update: UpdateQuery<BookDocument>,
  options: QueryOptions
) => {
  return Rent.findByIdAndUpdate(query, update, options);
};

export async function deleteBookService(query: FilterQuery<BookDocument>) {
  return Book.deleteOne(query);
}
