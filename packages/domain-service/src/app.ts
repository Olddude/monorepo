import { app, createErrorMiddleware } from '@monorepo/core'
import { router } from './router'
import { logger } from './logger'
import { auth } from './auth'

app.use(auth.initialize())
app.use(router)
app.use(createErrorMiddleware(logger))

export { app }
