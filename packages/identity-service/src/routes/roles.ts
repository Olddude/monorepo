import { createRouter, createBasicAuthMiddleware } from '@monorepo/core'
import { auth } from '../auth'
import { db } from '../db'

const basicAuthMiddleware = createBasicAuthMiddleware(auth)

export const roles = createRouter()

roles.get('/roles', basicAuthMiddleware, async (_req, res, next) => {
  try {
    const users = await db('roles').select()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

roles.get('/roles/:roleId', basicAuthMiddleware, async (req, res, next) => {
  try {
    const { roleId } = req.params
    const user = await db('roles').where({ id: roleId }).first()

    if (!user) {
      return res.status(404).json({ message: 'Role not found' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
})
