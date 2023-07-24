import { Knex } from 'knex'
import { Logger } from 'log4js'
import { Router } from 'express'
import { PassportStatic } from 'passport'

import { createUsersRouter } from './routes/users'
import { createRolesRouter } from './routes/roles'
import { createOAuthRouter } from './routes/oauth'
import { IdentityServiceConfig } from './config'

export async function createIdentityServerRouter(
  auth: PassportStatic,
  db: Knex,
  config: IdentityServiceConfig,
  logger: Logger,
) {
  const router = Router()
  router.use(await createUsersRouter(auth, db))
  router.use(await createRolesRouter(auth, db))
  router.use(await createOAuthRouter(db, config, logger))
  return router
}
