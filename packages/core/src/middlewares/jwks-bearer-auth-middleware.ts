import { Request, Response, NextFunction } from 'express'
import { PassportStatic } from 'passport'

export function createJwksBearerAuthMiddleware(auth: PassportStatic) {
  return function jwksBearerAuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    auth.authenticate('jwt', { session: false })(req, res, next)
  }
}
