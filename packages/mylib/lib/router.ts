import { Router } from 'express'
import { logger } from './logger'
import { config } from './config'
import { db } from './db'

export const router: Router = Router()

router.get('/', (req, res) => {
  res.json({
    message: 'mylib',
  })
})

router.get('/setup', async (req, res, next) => {
  try {
    logger.info(`%j`, config)
    await db.migrate.latest()
    res.json({ message: 'success' })
  } catch (error) {
    next(error)
  }
})

router.get('/teardown', async (req, res, next) => {
  try {
    await db.migrate.down()
    res.json({ message: 'success' })
  } catch (error) {
    next(error)
  }
})
