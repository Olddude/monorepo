import { configure, Logger } from 'log4js'

export interface LoggerConfig {
  level: 'error' | 'warn' | 'info' | 'debug'
  name: string
}

export function createLogger(config: LoggerConfig) {
  const logger: Logger = configure({
    appenders: {
      console: { type: 'console' },
    },
    categories: { default: { appenders: ['console'], level: config.level } },
  }).getLogger(config.name)
  return logger
}
