export const config = {
  environment: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'debug',
  port: process.env.PORT || '8000',
  debugPort: process.env.DEBUG_PORT || '9229',
  host: process.env.HOST || 'localhost',
  dbHost: process.env.DB_HOST || 'myappdb',
  dbPort: process.env.DB_PORT || '5432',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'postgres',
  dbName: process.env.DB_NAME || 'myappdb',
}
