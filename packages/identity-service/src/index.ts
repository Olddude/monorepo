import * as process from 'node:process'

import { createIdentityServiceServer } from './server'
import { createIdentityServiceApp } from './app'
import { createIdentityServerRouter } from './router'
import { createIdentityServiceConfig } from './config'
import { createIdentityServiceLogger } from './logger'
import { createIdentityServiceDatabase } from './db'
import { createIdentityServiceAuth } from './auth'

async function main() {
  try {
    const config = await createIdentityServiceConfig()
    const logger = await createIdentityServiceLogger(config.loggerConfig)
    const database = await createIdentityServiceDatabase(config.dbConfig)
    const auth = await createIdentityServiceAuth(database)
    const router = await createIdentityServerRouter(auth, database, logger)
    const app = await createIdentityServiceApp(auth, router, logger)
    const server = await createIdentityServiceServer(app)

    const { serverConfig } = config
    const { port } = serverConfig

    server.listen(port, () => {
      setTimeout(async () => {
        logger.info(config)
        await database.migrate.latest()
      }, 5000)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
