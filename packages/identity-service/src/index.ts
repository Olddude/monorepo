import * as process from 'node:process'

import { server } from './server'
import { config } from './config'
import { logger } from './logger'
import { db } from './db'

function main() {
  try {
    const { serverConfig } = config
    const { port } = serverConfig
    server.listen(port, () => {
      setTimeout(async () => {
        logger.info(config)
        await db.migrate.latest()
      }, 5000)
    })
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

main()
