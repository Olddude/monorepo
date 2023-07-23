import { Knex } from 'knex'
import { Logger } from 'log4js'
import { Router } from 'express'
import { PassportStatic } from 'passport'

import { createUsersRouter } from './routes/users'
import { createRolesRouter } from './routes/roles'
import { createOAuthRouter } from './routes/oauth'

export async function createIdentityServerRouter(
  auth: PassportStatic,
  db: Knex,
  logger: Logger,
) {
  const router = Router()
  router.use(await createUsersRouter(auth, db))
  router.use(await createRolesRouter(auth, db))
  router.use(await createOAuthRouter(db, logger))
  return router
}
