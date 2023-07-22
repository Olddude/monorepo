const { Calc, router } = require('mylib')
const { db } = require('./db')
const { logger } = require('./logger')

router.get('/error', (req, _res, next) => {
  try {
    logger.info(req['user'])
    throw new Error('foobar')
  } catch (error) {
    next(error)
  }
})

router.get('/add', (req, res) => {
  const { left, right } = req.query
  if (left && right) {
    const leftNum = Number.parseInt(left.toString(), 10)
    const rightNum = Number.parseInt(right.toString(), 10)
    res.json({
      result: new Calc().add(leftNum, rightNum),
    })
  } else {
    res.status(400).json({
      message: 'invalid left or right',
    })
  }
})

router.get('/users', async (req, res, next) => {
  try {
    const users = await db('users').select()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = { router }
