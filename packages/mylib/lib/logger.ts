import { configure, Logger } from 'log4js'

export const logger: Logger = configure({
  appenders: {
    console: { type: 'console' },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
  },
}).getLogger()
