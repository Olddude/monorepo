import {
  createApp,
  createAuthInitializeMiddleware,
  createErrorMiddleware,
  createSwaggerMiddlewares,
} from '@monorepo/core'
import { router } from './router'
import { logger } from './logger'
import { auth } from './auth'

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
              tokenUrl: 'http://localhost:8000/oauth/token', // Your Identity server token endpoint
              scopes: {
                'write:*': 'write access',
                'read:*': 'read access',
                'delete:*': 'delete access',
              },
            },
          },
        },
      },
      schemas: {},
    },
    security: [
      {
        OAuth2: ['write:*', 'read:*', 'delete:*'], // Define scopes here that apply for all routes
      },
    ],
    paths: {},
  },
  apis: [],
})

export const app = createApp()
app.use(createAuthInitializeMiddleware(auth))
app.use(router)
app.use('/swagger', ...swaggerMiddlewares)
app.use(createErrorMiddleware(logger))
