import * as passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { compareSync } from 'bcrypt'
import { Knex } from 'knex'

export function createIdentityServiceAuth(db: Knex) {
  const auth = passport

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

  return auth
}
