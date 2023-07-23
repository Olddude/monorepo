import { Request, Response, NextFunction } from 'express'

export function createExtractCredentialsMiddleware() {
  return function extractCredentialsMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Basic')
    ) {
      const base64Credentials = req.headers.authorization.split(' ')[1]
      const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'utf8',
      )
      const [client_id, client_secret] = credentials.split(':')
      req.body.client_id = client_id
      req.body.client_secret = client_secret
    }
    next()
  }
}
