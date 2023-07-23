import { Request, Response, NextFunction } from 'express'
import { PassportStatic } from 'passport'

export function createBasicAuthMiddleware(auth: PassportStatic) {
  return function basicAuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    auth.authenticate('basic', { session: false })(req, res, next)
  }
}
