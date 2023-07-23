import {
  createRouter,
  createExtractCredentialsMiddleware,
} from '@monorepo/core'
import { db } from '../db'
import * as jwt from 'jsonwebtoken'
import { logger } from '../logger'

export const oauth = createRouter()

const extractCredentialsMiddleware = createExtractCredentialsMiddleware()

oauth.post('/oauth/token', extractCredentialsMiddleware, async (req, res) => {
  logger.info('oauth token endpoint')
  logger.info(req.headers)
  logger.info(req.body)
  const { client_id, client_secret } = req.body

  // Validate the client credentials
  const client = await db('clients').where({ id: client_id }).first()

  if (!client || client.secret !== client_secret) {
    return res.status(401).json({ error: 'Invalid client credentials' })
  }

  // Create and sign the JWT
  const token = jwt.sign(
    { client_id },
    'YOUR_SECRET_KEY', // Replace with your own secret key
    { expiresIn: '1h' }, // Set the token expiration as needed
  )

  res.json({ access_token: token, token_type: 'Bearer' })
})
