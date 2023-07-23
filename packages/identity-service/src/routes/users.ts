import { createRouter, createBasicAuthMiddleware } from '@monorepo/core'
import { db } from '../db'
import { auth } from '../auth'
import { v4 } from 'uuid'
import { hashSync } from 'bcrypt'

export async function createUsersRouter() {
  const basicAuthMiddleware = createBasicAuthMiddleware(auth)
  const users = createRouter()

  users.get('/users', basicAuthMiddleware, async (req, res, next) => {
    try {
      const users = await db('users').select()
      res.json(users)
    } catch (err) {
      next(err)
    }
  })

  users.get('/users/:userId', basicAuthMiddleware, async (req, res, next) => {
    try {
      const { userId } = req.params
      const user = await db('users').where({ id: userId }).first()

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json(user)
    } catch (error) {
      next(error)
    }
  })

  users.post('/users', basicAuthMiddleware, async (req, res, next) => {
    try {
      const { username, password } = req.body
      await db('users').insert({
        id: v4(),
        username,
        password: hashSync(password, 10),
      })
      res.json({ message: 'success' })
    } catch (error) {
      next(error)
    }
  })

  users.put('/users/:userId', basicAuthMiddleware, async (req, res, next) => {
    try {
      const { userId } = req.params
      const { username, password } = req.body
      const hashedPassword = hashSync(password, 10)
      const targetUser = await db('users').where({ id: userId }).first()

      if (!targetUser) {
        return res.status(404).json({ message: 'User not found' })
      }

      await db('users').where({ id: userId }).update({
        username,
        password: hashedPassword,
      })

      res.json({ message: 'success' })
    } catch (error) {
      next(error)
    }
  })

  users.delete(
    '/users/:userId',
    basicAuthMiddleware,
    async (req, res, next) => {
      try {
        const { userId } = req.params
        const targetUser = await db('users').where({ id: userId }).first()

        if (!targetUser) {
          return res.status(404).json({ message: 'User not found' })
        }

        await db('users').where({ id: userId }).delete()

        res.json({ message: 'User successfully deleted' })
      } catch (error) {
        next(error)
      }
    },
  )
  return users
}
