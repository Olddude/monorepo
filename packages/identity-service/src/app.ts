import {
  createApp,
  createAuthInitializeMiddleware,
  createErrorMiddleware,
  createSwaggerMiddlewares,
} from '@monorepo/core'
import { router } from './router'
import { logger } from './logger'
import { auth } from './auth'
import { Paths } from './docs/paths'
import { Schemas } from './docs/schemas'

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

export const app = createApp()
app.use(createAuthInitializeMiddleware(auth))
app.use(router)
app.use('/swagger.json', (_req, res) => res.json(swaggerJson))
app.use('/swagger', ...createSwaggerMiddlewares(swaggerJson))
app.use(createErrorMiddleware(logger))
