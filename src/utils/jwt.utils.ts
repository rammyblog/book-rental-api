import jwt from 'jsonwebtoken';

export const verifyJwt = (token: string) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};
