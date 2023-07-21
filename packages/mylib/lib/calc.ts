import { logger } from './logger'

export abstract class Calc {
  static add(left: number, right: number): number {
    return left + right
  }

  static subtract(left: number, right: number): number {
    return left - right
  }

  static multiply(left: number, right: number): number {
    return left * right
  }

  static divide(left: number, right: number): number | undefined {
    try {
      return left / right
    } catch (error) {
      logger.error(error)
      return undefined
    }
  }
}
