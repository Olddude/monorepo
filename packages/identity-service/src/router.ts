import { createRouter } from '@monorepo/core'
import { users } from './routes/users'
import { roles } from './routes/roles'

export const router = createRouter()
router.use(users)
router.use(roles)
