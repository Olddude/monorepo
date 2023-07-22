import * as passport from 'passport'

export interface AuthConfig {
  username: string
  password: string
}

export function createAuth(): passport.PassportStatic {
  return passport
}
