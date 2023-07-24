import * as cors from 'cors'
import { Router } from 'express'
import { PassportStatic } from 'passport'
import * as express from 'express'
import { Logger } from 'log4js'

import { createErrorMiddleware } from './middlewares/error.middleware'
import { createSwaggerMiddlewares } from './middlewares/swagger-middlewares'
import { Paths } from './docs/paths'
import { Schemas } from './docs/schemas'
import { createAuthInitializeMiddleware } from './middlewares/auth-initialize.middleware'

export function createIdentityServiceApp(
  auth: PassportStatic,
  router: Router,
  logger: Logger,
) {
  const swaggerJson = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Identity Service',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:8000',
          description: 'Indentity server',
        },
      ],
      components: {
        securitySchemes: {
          basicAuth: {
            type: 'http',
            scheme: 'basic',
          },
        },
        schemas: Schemas,
      },
      security: [
        {
          basicAuth: [],
        },
      ],
      paths: Paths,
    },
    apis: [],
  }

  const corsOptions: cors.CorsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }

  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors(corsOptions))
  app.use(createAuthInitializeMiddleware(auth))
  app.use(router)
  app.use('/swagger.json', (_req, res) => res.json(swaggerJson))
  app.use('/swagger', ...createSwaggerMiddlewares(swaggerJson))
  app.use(createErrorMiddleware(logger))
  return app
}
