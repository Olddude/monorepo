import * as path from 'node:path'
import knex from 'knex'

import { config } from './config'

const { dbHost, dbPort, dbUser, dbPassword, dbName } = config

export const db = knex({
  client: 'pg',
  connection: {
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    port: Number.parseInt(dbPort, 10),
  },
  migrations: {
    directory: path.resolve(process.cwd(), './dist/migrations'),
  },
})
