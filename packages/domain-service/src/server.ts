import * as http from 'node:http'
import { Express } from 'express'

export function createDomainServiceServer(app: Express) {
  const server = http.createServer(app)
  return server
}
