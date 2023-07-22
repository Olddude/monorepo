import * as swaggerUi from 'swagger-ui-express'
import * as swaggerJsdoc from 'swagger-jsdoc'

export function createSwaggerMiddleware(config: swaggerJsdoc.Options) {
  const swaggerSpec = swaggerJsdoc(config)
  return [swaggerUi.serve, swaggerUi.setup(swaggerSpec)]
}
