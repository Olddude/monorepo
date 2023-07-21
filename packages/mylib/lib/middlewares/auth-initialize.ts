import { Request, Response, NextFunction } from 'express'

import { auth } from '..'

export function authInitialize(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  auth.initialize()(req, res, next)
}
