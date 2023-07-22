const { server } = require('./src/server.js')
const { db } = require('./src/db.js')
const { config } = require('./src/config.js')
const { logger } = require('./src/logger.js')

async function main() {
  try {
    const { serverConfig } = config
    const { host, port } = serverConfig
    logger.info(config)
    await db.migrate.latest()
    process.on('SIGINT', async (exitCode) => {
      logger.warn(`exit code: ${exitCode}`)
      await db.migrate.down()
      process.exit(exitCode)
    })
    server.listen(port, host, () => {
      logger.info(`listening on http://${host}:${port}`)
    })
  } catch (error) {
    process.exit(1)
  }
}

main()
