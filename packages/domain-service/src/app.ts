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

const swaggerMiddlewares = createSwaggerMiddlewares({
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
})

export const app = createApp()
app.use(createAuthInitializeMiddleware(auth))
app.use(router)
app.use('/swagger', ...swaggerMiddlewares)
app.use(createErrorMiddleware(logger))
