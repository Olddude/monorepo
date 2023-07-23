import * as process from 'node:process'

import { createDomainServiceServer } from './server'
import { createDomainServiceConfig } from './config'
import { createDomainServiceLogger } from './logger'
import { createDomainServiceDatabase } from './db'
import { createDomainServiceAuth } from './auth'
import { createDomainServiceRouter } from './router'
import { createDomainServiceApp } from './app'

async function main() {
  try {
    const config = await createDomainServiceConfig()
    const logger = await createDomainServiceLogger(config.loggerConfig)
    const database = await createDomainServiceDatabase(config.dbConfig)
    const auth = await createDomainServiceAuth(
      'http://localhost:8000/.well-known/jwks.json',
    )
    const router = await createDomainServiceRouter(auth, database)
    const app = await createDomainServiceApp(auth, router, logger)
    const server = await createDomainServiceServer(app)

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
