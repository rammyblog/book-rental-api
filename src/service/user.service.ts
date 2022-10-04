import { Omit } from 'lodash';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, { UserDocument } from '../models/User.model';
import { loginUserInputSchema } from '../schema/user.schema';
import jwt from 'jsonwebtoken';

export const createUserService = async (
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) => {
  try {
    const user = await User.create(input);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findUser = async (query: FilterQuery<UserDocument>) => {
  return User.findOne(query);
};

export const loginUserService = (user: DocumentDefinition<UserDocument>) => {
  try {
    const token = jwt.sign(
      { _id: user._id, type: user.type },
      process.env.TOKEN_SECRET
    );
    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};
