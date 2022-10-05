import { z, object, string } from 'zod';

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required',
    }).min(2, 'Title is too short, should contain min of 2 characters'),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: 'Genre Id is required',
    }),
  }),
};

export const createGenreSchema = object({
  ...payload,
});

export const updateGenreSchema = object({
  ...payload,
  ...params,
});

export const deleteGenreSchema = object({
  ...params,
});

export const getGenreSchema = object({
  ...params,
});

export type createGenreSchemaInput = z.infer<typeof createGenreSchema>;
export type UpdateGenreInput = z.infer<typeof updateGenreSchema>;
export type DeleteGenreInput = z.infer<typeof deleteGenreSchema>;
export type ReadGenreInput = z.infer<typeof getGenreSchema>;
