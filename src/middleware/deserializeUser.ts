import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );
  if (!accessToken) {
    return next();
  }
  const verified = verifyJwt(accessToken);
  if (verified) {
    res.locals.user = verified;
    return next();
  }
  next();
};

export default deserializeUser;
