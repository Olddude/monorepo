import * as express from 'express'

export const app: express.Express = express()

app.get('/', (req, res) => {
  res.json({
    message: 'mylib',
  })
})
