import * as process from 'node:process'

import { server } from './server'
import { config } from './config'
import { logger } from './logger'

async function main() {
  try {
    const { serverConfig } = config
    const { port } = serverConfig
    server.listen(port, () => {
      logger.info(config)
    })
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

main()
