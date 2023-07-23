import knex from 'knex'

export interface DbConfig {
  client: string
  connection: {
    host: string
    user: string
    password: string
    database: string
    port: number
  }
  migrations: {
    directory: string
  }
}

export function createDomainServiceDatabase(config: DbConfig) {
  const db = knex(config)
  return db
}
