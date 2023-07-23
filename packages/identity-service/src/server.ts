import { Express } from 'express'
import * as http from 'node:http'

export async function createIdentityServiceServer(app: Express) {
  const server = http.createServer(app)
  return server
}
