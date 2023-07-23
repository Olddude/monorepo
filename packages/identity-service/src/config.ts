import * as path from 'node:path'

export function createIdentityServiceConfig() {
  const config = {
    loggerConfig: {
      level: process.env.LOG_LEVEL || 'info',
      name: 'default',
    },
    serverConfig: {
      environment: process.env.NODE_ENV || 'development',
      logLevel: process.env.LOG_LEVEL || 'debug',
      port: Number.parseInt(process.env.PORT || '8000', 10),
      debugPort: Number.parseInt(process.env.DEBUG_PORT || '9229', 10),
      host: process.env.HOST || 'localhost',
    },
    authConfig: {
      username: process.env.AUTH_USERNAME || 'admin',
      password: process.env.AUTH_PASSWORD || 'password',
    },
    dbConfig: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'domain',
        port: Number.parseInt(process.env.DB_PORT || '5432', 10),
      },
      migrations: {
        directory: path.resolve('dist/migrations'),
      },
    },
  }
  return config
}
