import * as passport from 'passport'
import * as jwksClient from 'jwks-rsa'
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from 'passport-jwt'

export async function createDomainServiceAuth(jwksUri: string) {
  const auth = passport

  const client = jwksClient({
    jwksUri,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
  })

  const jwtOptions: StrategyOptions = {
    issuer: 'http://localhost:8000',
    audience: 'http://localhost:8001',
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
