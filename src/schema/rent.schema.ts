import { z, object, string } from 'zod';

const payload = {
  body: object({
    book_id: string({
      required_error: 'Book Id is required',
    })
      .min(24, 'Book ID is too short, should contain min of 24 characters')
      .max(24, 'Book ID is too long, should contain max of 24 characters'),
    date_borrowed: z.preprocess(
      (arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
      },
      z
        .date({
          required_error: 'Please a intended borrowed date',
          invalid_type_error: "That's not a date!",
        })
        .refine((date) => {
          return date >= new Date(Date.now());
        }, 'The date must greater than today')
    ),
    date_due: z.preprocess(
      (arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
      },
      z
        .date({
          required_error: 'Please enter a intended returned date',
          invalid_type_error: "That's not a date!",
        })
        .refine((date) => {
          return date >= new Date(Date.now());
        }, 'The date must greater than today')
    ),
  }).refine((data) => data.date_due >= data.date_borrowed, {
    message: 'Date due must be greater than date borrowed',
    path: ['date_due'],
  }),
};

const params = {
  params: object({
    bookId: string({
      required_error: 'Book Id is required',
    }),
  }),
};

export const rentBookSchema = object({
  ...payload,
});

export const updateRentBookSchema = object({
  ...params,
});

export const getRentedBookSchema = object({});

export type rentBookSchemaInput = z.infer<typeof rentBookSchema>;
export type UpdateRentBookInput = z.infer<typeof updateRentBookSchema>;
export type ReadRentedBookInput = z.infer<typeof getRentedBookSchema>;
