import { z, object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }).min(2, 'Name is too short, should contain min of 2 characters'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too short, a minimum of 6 is required'),
    email: string({ required_error: 'Email is required' }).email(
      'Email is not valid'
    ),
  }),
});

export const loginUserSchema = object({
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too short, a minimum of 6 is required'),
    email: string({ required_error: 'Email is required' }).email(
      'Email is not valid'
    ),
  }),
});

export type createUserSchema = z.infer<typeof createUserSchema>;
export type loginUserInputSchema = z.infer<typeof loginUserSchema>;
