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
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User unique identifier',
            },
            username: {
              type: 'string',
              description: 'User name',
            },
            password: {
              type: 'string',
              description: 'User password',
            },
          },
        },
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
    paths: {
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
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
            // Other responses...
          },
          post: {
            summary: 'Creates a new user in the database',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      username: {
                        type: 'string',
                      },
                      password: {
                        type: 'string',
                      },
                    },
                    required: ['username', 'password'],
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'Create successful',
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
        post: {
          summary: 'Creates a new user in the database',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                    },
                    password: {
                      type: 'string',
                    },
                  },
                  required: ['username', 'password'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Create successful',
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
          },
        },
      },
      '/users/{userId}': {
        get: {
          summary: 'Fetches a user from the database by ID',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Fetch successful',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
            '404': {
              description: 'User not found',
            },
            // Other responses...
          },
        },
        put: {
          summary: 'Updates a user in the database by ID',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                    },
                    password: {
                      type: 'string',
                    },
                  },
                  required: ['username', 'password'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Update successful',
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
            '404': {
              description: 'User not found',
            },
            // Other responses...
          },
        },
        delete: {
          summary: 'Deletes a user from the database by ID',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Delete successful',
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
            '404': {
              description: 'User not found',
            },
            // Other responses...
          },
        },
      },
    },
  },
  apis: ['http://localhost:8000'],
})

app.use(createAuthInitializeMiddleware(auth))
app.use(router)
app.use('/swagger', ...swaggerMiddlewares)
app.use(createErrorMiddleware(logger))

export { app }
