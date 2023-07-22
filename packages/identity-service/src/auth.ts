import { createAuth } from '@monorepo/core'
import { db } from './db'

export const auth = createAuth(db)
