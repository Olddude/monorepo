import {
  app,
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
      title: 'Identity Service',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
    paths: {
      '/error': {
        get: {
          summary:
            'An endpoint that always throws an error for testing purposes',
          responses: {
            '500': {
              description: 'An error occurred',
            },
            // Other responses...
          },
        },
      },
      '/add': {
        get: {
          summary: 'Adds two numbers together',
          parameters: [
            {
              name: 'left',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
              },
            },
            {
              name: 'right',
              in: 'query',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Addition successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      result: {
                        type: 'integer',
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid left or right',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            // Other responses...
          },
        },
      },
      '/users': {
        get: {
          summary: 'Fetches all users from the database',
          responses: {
            '200': {
              description: 'Fetch successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/definitions/User',
                    },
                  },
                },
              },
            },
            // Other responses...
          },
        },
      },
      // Other paths...
    },
    definitions: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User unique identifier',
          },
          name: {
            type: 'string',
            description: 'User name',
          },
          // Other User properties...
        },
      },
      // Other definitions...
    },
  },
  apis: ['http://localhost:8000'],
})

app.use(createAuthInitializeMiddleware(auth))
app.use(router)
app.use('/swagger', ...swaggerMiddlewares)
app.use(createErrorMiddleware(logger))

export { app }
