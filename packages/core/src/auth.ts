import { compareSync } from 'bcrypt'
import { Knex } from 'knex'
import * as passport from 'passport'
import { BasicStrategy } from 'passport-http'
import * as jwksClient from 'jwks-rsa'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

export function createAuth(db: Knex, jwksUri: string): passport.PassportStatic {
  const client = jwksClient({
    jwksUri,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
  })

  function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
      const signingKey = key.getPublicKey()
      callback(null, signingKey)
    })
  }

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKeyProvider: getKey,
    algorithms: ['RS256'],
  }

  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      done(null, jwtPayload)
    }),
  )

  passport.use(
    'basic',
    new BasicStrategy(async (username, password, done) => {
      try {
        const user = await db('users').where('username', username).first()

        if (!user) {
          return done({ message: 'Incorrect username.' }, false)
        }

        if (!compareSync(password, user.password)) {
          return done({ message: 'Incorrect password.' }, false)
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }),
  )

  passport.serializeUser((user, done) => {
    done(null, user['id'])
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db('users').where('id', id).first()
      done(null, user)
    } catch (error) {
      done(error)
    }
  })

  return passport
}
