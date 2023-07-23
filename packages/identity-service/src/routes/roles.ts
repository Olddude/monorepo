import { PassportStatic } from 'passport'
import { Knex } from 'knex'
import { Router } from 'express'

import { createBasicAuthMiddleware } from '../middlewares/basic-auth.middleware'

export async function createRolesRouter(auth: PassportStatic, db: Knex) {
  const basicAuthMiddleware = createBasicAuthMiddleware(auth)
  const roles = Router()

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
  return roles
}
