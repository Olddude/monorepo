import { createLogger } from '@monorepo/core'
import { config } from './config'

export const logger = createLogger({
  level: config.loggerConfig.level,
  name: config.loggerConfig.name,
})
