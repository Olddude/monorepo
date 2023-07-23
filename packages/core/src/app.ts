import * as express from 'express'

export function createApp(): express.Express {
  const app: express.Express = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  return app
}
