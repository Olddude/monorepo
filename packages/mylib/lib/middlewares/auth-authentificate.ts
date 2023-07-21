import { Request, Response, NextFunction } from 'express'

import { auth } from '..'

export function authAuthentificate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  auth.authenticate('basic', { session: false })(req, res, next)
}
