import * as process from 'node:process'

import { createIdentityServiceServer } from './server'
import { createIdentityServiceApp } from './app'
import { createIdentityServerRouter } from './router'
import { config } from './config'
import { logger } from './logger'
import { db } from './db'

async function main() {
  try {
    const { serverConfig } = config
    const { port } = serverConfig

    const router = await createIdentityServerRouter()
    const app = await createIdentityServiceApp(router)
    const server = await createIdentityServiceServer(app)

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
