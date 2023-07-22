const { createDb } = require('mylib')

const { config } = require('./config')
const { logger } = require('./logger')

const db = createDb(config.dbConfig, logger)

module.exports = { db }
