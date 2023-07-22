const { createLogger } = require('mylib')
const { config } = require('./config')

const logger = createLogger(config.loggerConfig)

module.exports = { logger }
