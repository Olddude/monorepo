const { app, createErrorHandling } = require('mylib')
const { router } = require('./router')
const { logger } = require('./logger')
const { auth } = require('./auth')

app.use(auth.initialize())
app.use(router)
app.use(createErrorHandling(logger))

module.exports = { app }
