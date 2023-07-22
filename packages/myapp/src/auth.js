const { createAuth } = require('mylib')
const { config } = require('./config')
const { logger } = require('./logger')

const auth = createAuth(config.authConfig, logger)

module.exports = { auth }
