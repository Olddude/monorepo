import { createRouter } from '@monorepo/core'
import { users } from './routes/users'
import { roles } from './routes/roles'
import { oauth } from './routes/oauth'

export const router = createRouter()
router.use(users)
router.use(roles)
router.use(oauth)
