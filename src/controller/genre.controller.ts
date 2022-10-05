import { Request, Response } from 'express';
import Genre from '../models/Genre.model';
import {
  createGenreSchemaInput,
  ReadGenreInput,
  UpdateGenreInput,
} from '../schema/genre.schema';
import {
  createGenreService,
  deleteGenreService,
  findGenreService,
  updateGenreService,
} from '../service/genre.service';

export const createGenreHandler = async (
  req: Request<{}, {}, createGenreSchemaInput['body']>,
  res: Response
) => {
  try {
    const genre = await createGenreService(req.body);
    return res.send(genre.toJSON());
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const getAllGenreHandler = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    return res.send(genres);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const getSingleGenreHandler = async (
  req: Request<ReadGenreInput['params']>,
  res: Response
) => {
  try {
    const genreId = req.params.id;
    const genre = await findGenreService({ _id: genreId });
    if (!genre) {
      return res.send(404);
    }
    return res.status(200).send(genre);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const updateGenreHandler = async (
  req: Request<UpdateGenreInput['params']>,
  res: Response
) => {
  try {
    const genreId = req.params.id;
    const update = req.body;
    const genre = await findGenreService({ _id: genreId });
    if (!genre) {
      return res.send(404);
    }
    const updatedGenre = await updateGenreService({ _id: genreId }, update, {
      new: true,
    });
    return res.send(updatedGenre);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const deleteGenreHandler = async (
  req: Request<UpdateGenreInput['params']>,
  res: Response
) => {
  try {
    const genreId = req.params.id;
    await deleteGenreService({ genreId });
    return res.status(200).send('Delete successful');
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
