import { Request, Response, NextFunction } from 'express'

import { logger } from '..'

export function errorHandling(
  error: Error & { status: number | undefined },
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (error) {
    const { headers, body } = req
    logger.error('%j', {
      error,
      request: { headers, body, cwd: process.cwd() },
    })
    res.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    })
  }
  next()
}
