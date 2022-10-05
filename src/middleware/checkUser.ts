import { NextFunction, Request, Response } from 'express';

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.sendStatus(403);
  }
  next();
};

export const requireAdminUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (user.type !== 'admin') {
    return res.sendStatus(403);
  }
  next();
};

