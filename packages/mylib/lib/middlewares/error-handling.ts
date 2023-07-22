import { Request, Response, NextFunction } from 'express'

import { Logger } from 'log4js'

export function createErrorHandling(logger: Logger) {
  return function errorHandling(
    error: Error & { status: number | undefined },
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (error) {
      const { headers, body } = req
      logger.error({
        error,
        context: {
          headers,
          body,
          cwd: process.cwd(),
          env: process.env,
        },
      })
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
      })
    }
    next()
  }
}
