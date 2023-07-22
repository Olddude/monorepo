import knex, { Knex } from 'knex'

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

export function createDb(config: DbConfig): Knex<unknown, unknown[]> {
  return knex(config)
}
