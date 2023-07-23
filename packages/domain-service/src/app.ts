import * as express from 'express'
import { Router } from 'express'
import { PassportStatic } from 'passport'

import { createAuthInitializeMiddleware } from './middlewares/auth-initialize.middleware'
import { createErrorMiddleware } from './middlewares/error.middleware'
import { createSwaggerMiddlewares } from './middlewares/swagger-middlewares'
import { Paths } from './docs/paths'
import { Schemas } from './docs/schemas'
import { Logger } from 'log4js'

export async function createDomainServiceApp(
  auth: PassportStatic,
  router: Router,
  logger: Logger,
) {
  const swaggerJson = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Domain Service',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          OAuth2: {
            type: 'oauth2',
            flows: {
              clientCredentials: {
                tokenUrl: 'http://localhost:8000/oauth/token',
                scopes: {
                  'write:*': 'write access',
                  'read:*': 'read access',
                  'delete:*': 'delete access',
                },
              },
            },
          },
        },
        schemas: Schemas,
      },
      security: [
        {
          OAuth2: ['write:*', 'read:*', 'delete:*'],
        },
      ],
      paths: Paths,
    },
    apis: [],
  }
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(createAuthInitializeMiddleware(auth))
  app.use(router)
  app.use('/swagger.json', (_req, res) => res.json(swaggerJson))
  app.use('/swagger', ...createSwaggerMiddlewares(swaggerJson))
  app.use(createErrorMiddleware(logger))
  return app
}
