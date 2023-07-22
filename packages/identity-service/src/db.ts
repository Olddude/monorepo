import { createDb } from '@monorepo/core'

const { config } = require('./config')

export const db = createDb(config.dbConfig)
