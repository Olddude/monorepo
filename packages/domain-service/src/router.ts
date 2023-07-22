import { Calc, router, createBasicAuthMiddleware } from '@monorepo/core'
import { db } from './db'
import { logger } from './logger'
import { auth } from './auth'

const basicAuthMiddleware = createBasicAuthMiddleware(auth)

router.get('/error', basicAuthMiddleware, (req, _res, next) => {
  try {
    logger.info(req['user'])
    throw new Error('foobar')
  } catch (error) {
    next(error)
  }
})

router.get('/add', basicAuthMiddleware, (req, res) => {
  const { left, right } = req.query
  if (left && right) {
    const leftNum = Number.parseInt(left.toString(), 10)
    const rightNum = Number.parseInt(right.toString(), 10)
    res.json({
      result: new Calc(logger).add(leftNum, rightNum),
    })
  } else {
    res.status(400).json({
      message: 'invalid left or right',
    })
  }
})

router.get('/users', basicAuthMiddleware, async (req, res, next) => {
  try {
    const users = await db('users').select()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

export { router }
