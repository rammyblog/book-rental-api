import { z, object, string, date, boolean } from 'zod';

const payload = {
  body: object({
    isbn: string({
      required_error: 'ISBN is required',
    }).min(2, 'ISBN is too short, should contain min of 2 characters'),
    title: string({
      required_error: 'Title is required',
    }).min(2, 'Title is too short, should contain min of 2 characters'),
    genre: string({
      required_error: 'Genre is required',
    })
      .min(24, 'Genre ID is too short, should contain min of 24 characters')
      .max(24, 'Genre ID is too long, should contain max of 24 characters'),
    description: string({
      required_error: 'Description is required',
    }).min(10, 'Description is too short, should contain min of 20 characters'),
    image: string({
      required_error: 'Image url is required',
    }).url(),
    released: z.preprocess(
      (arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
      },
      z.date({
        required_error: 'Please select a release date',
        invalid_type_error: "That's not a date!",
      })
    ),
    available: boolean({
      required_error: 'Enter a correct boolean',
    }),
  }),
};

const params = {
  params: object({
    id: string({
      required_error: 'Book Id is required',
    }),
  }),
};

export const createBookSchema = object({
  ...payload,
});

export const updateBookSchema = object({
  ...payload,
  ...params,
});

export const deleteBookSchema = object({
  ...params,
});

export const getBookSchema = object({
  ...params,
});

export type createBookSchemaInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type DeleteBookInput = z.infer<typeof deleteBookSchema>;
export type ReadBookInput = z.infer<typeof getBookSchema>;
