import * as swaggerUi from 'swagger-ui-express'
import * as swaggerJsdoc from 'swagger-jsdoc'

export function createSwaggerMiddlewares(config: swaggerJsdoc.Options) {
  const swaggerSpec = swaggerJsdoc(config)
  return [swaggerUi.serve, swaggerUi.setup(swaggerSpec)]
}
