import { Request, Response } from 'express';
import { omit } from 'lodash';
import User from '../models/User.model';
import { createUserSchema, loginUserInputSchema } from '../schema/user.schema';
import {
  createUserService,
  findUser,
  loginUserService,
} from '../service/user.service';

export const createUserHandler = async (
  req: Request<{}, {}, createUserSchema['body']>,
  res: Response
) => {
  try {
    const user = await createUserService(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, loginUserInputSchema['body']>,
  res: Response
) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send('Email/password not correct');
    }
    const validPass = await user.comparePassword(req.body.password);
    if (!validPass) {
      return res.send('Email/password not correct');
    }
    const token = loginUserService(user);
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
