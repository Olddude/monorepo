import { Logger, configure } from 'log4js'

export interface LoggerConfig {
  level: string
  name: string
}

export function createDomainServiceLogger(config: LoggerConfig) {
  const logger: Logger = configure({
    appenders: {
      console: { type: 'console' },
    },
    categories: { default: { appenders: ['console'], level: config.level } },
  }).getLogger(config.name)
  return logger
}
