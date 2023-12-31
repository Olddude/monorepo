import { JWS, JWK } from 'node-jose'
import { Knex } from 'knex'
import { Router } from 'express'

import { createExtractCredentialsMiddleware } from '../middlewares/extract-credentials.middleware'
import { IdentityServiceConfig } from '../config'
import { Logger } from 'log4js'

export async function createOAuthRouter(
  db: Knex,
  config: IdentityServiceConfig,
  logger: Logger,
) {
  const oauth = Router()

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
    const { client_id, client_secret } = req.body

    const client = await db('clients').where({ id: client_id }).first()

    if (!client || client.secret !== client_secret) {
      return res.status(401).json({ error: 'Invalid client credentials' })
    }

    const issuer = `http://${config.serverConfig.host}:${config.serverConfig.port}`
    const audience = config.authConfig.audience
    const tokenPayload = JSON.stringify({
      client_id,
      iss: issuer,
      aud: audience,
    })

    logger.info(tokenPayload)

    const token = await JWS.createSign(
      {
        format: 'compact',
        alg: 'RS256',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      privateJWK as any,
    )
      .update(tokenPayload)
      .final()

    res.json({ access_token: token, token_type: 'Bearer' })
  })

  return oauth
}
