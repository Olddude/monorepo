import { Logger } from 'log4js'

export class Calc {
  constructor(private readonly logger: Logger) {}

  add(left: number, right: number): number {
    return left + right
  }

  subtract(left: number, right: number): number {
    return left - right
  }

  multiply(left: number, right: number): number {
    return left * right
  }

  divide(left: number, right: number): number | undefined {
    try {
      return left / right
    } catch (error) {
      this.logger.error(error)
      return undefined
    }
  }
}
