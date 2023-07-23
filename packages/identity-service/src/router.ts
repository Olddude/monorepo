import { createRouter } from '@monorepo/core'
import { createUsersRouter } from './routes/users'
import { createRolesRouter } from './routes/roles'
import { createOAuthRouter } from './routes/oauth'

export async function createIdentityServerRouter() {
  const router = createRouter()
  router.use(await createUsersRouter())
  router.use(await createRolesRouter())
  router.use(await createOAuthRouter())
  return router
}
