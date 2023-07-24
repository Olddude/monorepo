import * as passport from 'passport'
import * as jwksClient from 'jwks-rsa'
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from 'passport-jwt'
import { DomainServiceConfig } from './config'

export async function createDomainServiceAuth(config: DomainServiceConfig) {
  const auth = passport

  const client = jwksClient({
    jwksUri: `${config.authConfig.server}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
  })

  const jwtOptions: StrategyOptions = {
    issuer: config.authConfig.server,
    audience: `http://${config.serverConfig.host}:${config.serverConfig.port}`,
    algorithms: ['RS256'],
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
