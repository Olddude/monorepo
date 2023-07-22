import { Request, Response, NextFunction } from 'express'

import { Logger } from 'log4js'

export function createErrorMiddleware(logger: Logger) {
  return function errorMiddleware(
    error: Error & { status: number | undefined },
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (error) {
      const { headers, body } = req
      logger.error({
        context: {
          headers,
          body,
          argv: process.argv,
          env: process.env,
        },
        error,
      })
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
      })
    }
    next()
  }
}
