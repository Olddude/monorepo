const http = require('node:http')
const { app } = require('./app.js')

const server = http.createServer(app)

module.exports = { server }
