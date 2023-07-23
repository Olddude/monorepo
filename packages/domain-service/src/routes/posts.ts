import { Router } from 'express'
import { Knex } from 'knex'
import { PassportStatic } from 'passport'

import { createJwksBearerAuthMiddleware } from '../middlewares/jwks-bearer.middleware'

export async function createPostsRouter(auth: PassportStatic, db: Knex) {
  const posts = Router()

  const jwksBearerAuthMiddleware = createJwksBearerAuthMiddleware(auth)

  posts.get('/posts', jwksBearerAuthMiddleware, async (_req, res, next) => {
    try {
      const users = await db('roles').select()
      res.json(users)
    } catch (err) {
      next(err)
    }
  })

  posts.get(
    '/posts/:postId',
    jwksBearerAuthMiddleware,
    async (req, res, next) => {
      try {
        const { postId } = req.params
        const user = await db('posts').where({ id: postId }).first()

        if (!user) {
          return res.status(404).json({ message: 'Post not found' })
        }

        res.json(user)
      } catch (error) {
        next(error)
      }
    },
  )

  return posts
}
