import {
  createRouter,
  createExtractCredentialsMiddleware,
} from '@monorepo/core'
import { db } from '../db'
import { JWS, JWK } from 'node-jose'
import { logger } from '../logger'

export async function createOAuthRouter() {
  const oauth = createRouter()

  const extractCredentialsMiddleware = createExtractCredentialsMiddleware()

  const keystore = JWK.createKeyStore()

  const keyPair = await keystore.generate('RSA', 2048, {
    alg: 'RS256',
    use: 'sig',
  })

  const publicJWK = keyPair.toJSON()
  const privateJWK = keyPair.toJSON(true)

  oauth.get('/.well-known/jwks.json', (req, res) => {
    res.json({
      keys: [publicJWK],
    })
  })

  oauth.post('/oauth/token', extractCredentialsMiddleware, async (req, res) => {
    logger.info('oauth token endpoint')
    logger.info(req.headers)
    logger.info(req.body)
    logger.info(publicJWK)
    logger.info(privateJWK)

    const { client_id, client_secret } = req.body

    const client = await db('clients').where({ id: client_id }).first()

    if (!client || client.secret !== client_secret) {
      return res.status(401).json({ error: 'Invalid client credentials' })
    }

    const token = await JWS.createSign(
      {
        format: 'compact',
        alg: 'RS256',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      privateJWK as any,
    )
      .update(JSON.stringify({ client_id }))
      .final()

    res.json({ access_token: token, token_type: 'Bearer' })
  })

  return oauth
}
