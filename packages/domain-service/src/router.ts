import { PassportStatic } from 'passport'
import { createPostsRouter } from './routes/posts'
import { Router } from 'express'
import { Knex } from 'knex'

export async function createDomainServiceRouter(
  auth: PassportStatic,
  db: Knex,
) {
  const router = Router()
  router.use(await createPostsRouter(auth, db))
  return router
}
