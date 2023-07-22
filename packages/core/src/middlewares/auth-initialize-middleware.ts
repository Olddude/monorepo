import { Request, Response, NextFunction } from 'express'
import { PassportStatic } from 'passport'

export function createAuthInitializeMiddleware(auth: PassportStatic) {
  return function authInitializeMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    auth.initialize()(req, res, next)
  }
}
