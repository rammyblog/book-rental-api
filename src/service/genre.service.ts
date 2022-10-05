import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import Genre, { GenreDocument } from '../models/Genre.model';

export const createGenreService = async (
  input: DocumentDefinition<Omit<GenreDocument, 'createdAt' | 'updatedAt'>>
) => {
  try {
    const genre = await Genre.create(input);
    return genre;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findGenreService = async (
  query: FilterQuery<GenreDocument>,
  options: QueryOptions = { lean: true }
) => {
  return Genre.findOne(query, {}, options);
};

export const updateGenreService = async (
  query: FilterQuery<GenreDocument>,
  update: UpdateQuery<GenreDocument>,
  options: QueryOptions
) => {
  return Genre.findByIdAndUpdate(query, update, options);
};

export async function deleteGenreService(query: FilterQuery<GenreDocument>) {
  return Genre.deleteOne(query);
}
