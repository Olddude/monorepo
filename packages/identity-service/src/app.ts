import {
  app,
  createErrorMiddleware,
  createSwaggerMiddleware,
} from '@monorepo/core'
import { router } from './router'
import { logger } from './logger'
import { auth } from './auth'

const swaggerMiddleware = createSwaggerMiddleware({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo App',
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
  },
  apis: ['http://localhost:8000'],
})

app.use(auth.initialize())
app.use(router)
app.use('/swagger', ...swaggerMiddleware)
app.use(createErrorMiddleware(logger))

export { app }
