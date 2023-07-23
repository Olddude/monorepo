import * as passport from 'passport'
import * as jwksClient from 'jwks-rsa'
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from 'passport-jwt'
import { Logger } from 'log4js'

export async function createDomainServiceAuth(jwksUri: string, logger: Logger) {
  const auth = passport

  const client = jwksClient({
    jwksUri,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    fetcher(jwksUri) {
      logger.info(jwksUri)
      return Promise.resolve({ keys: {} })
    },
  })

  const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: 'http://localhost:8000',
    algorithms: ['RS256'],
    secretOrKeyProvider: (request, rawJwtToken, done) => {
      const jwtHeaderJson = Buffer.from(
        rawJwtToken.split('.')[0],
        'base64',
      ).toString()
      const header = JSON.parse(jwtHeaderJson)
      client.getSigningKey(header.kid, function (err, key) {
        if (err) {
          done(err, null)
        } else {
          const signingKey = key.getPublicKey()
          done(null, signingKey)
        }
      })
    },
  }

  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      done(null, jwtPayload)
    }),
  )

  return auth
}
