import { Calc, app, router, errorHandling } from 'mylib'

router.get('/error', (_req, _res, next) => {
  try {
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
      result: Calc.add(leftNum, rightNum),
    })
  } else {
    res.status(400).json({
      message: 'invalid left or right',
    })
  }
})

app.use(router)
app.use(errorHandling)

export default app
