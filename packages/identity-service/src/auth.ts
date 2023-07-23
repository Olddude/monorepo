import { createAuth } from '@monorepo/core'
import { db } from './db'

export const auth = createAuth(
  db,
  'http://localhost:8000/.well-known/jwks.json',
)
