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
import cors = require('cors')

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

const corsOptions = {
  origin: [
    'http://localhost:8001',
    'http://localhost:3000',
    'http://localhost:4200',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true, // This allows the session cookie to be sent back and forth
}

export const app = createApp()
app.use(cors(corsOptions))
app.use(createAuthInitializeMiddleware(auth))
app.use(router)
app.use('/swagger.json', (_req, res) => res.json(swaggerJson))
app.use('/swagger', ...createSwaggerMiddlewares(swaggerJson))
app.use(createErrorMiddleware(logger))
